"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import moment from "moment";
import { handleError, httpDelete, httpGet } from "@/utils/rest-client";
import { appContext } from "@/providers/AppProvider";
import money from "mm-money";

export default function DailySaleReport() {
    const { setLoading } = useContext(appContext);
    const [fromDate, setFromDate] = useState(moment().format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
    const [reportDatas, setReportDatas] = useState([]);
    const [totalQty, setTotalQty] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0.0);
    const [totalDiscount, setTotalDiscount] = useState(0.0);
    const [totalNetSale, setTotalNetSale] = useState(0.0);
    const router = useRouter();

    const fetchItems = useCallback(() => {
        console.log(fromDate, toDate);
        setLoading(true);
        httpGet("/api/daily-sale-report", {
            params: {
                from_date: !fromDate ? moment().format('YYYY-MM-DD') : fromDate,
                to_date: !toDate ? moment().format('YYYY-MM-DD') : toDate,
                shop_id: 2
            },
        }).then((res) => {
            setLoading(false);
            setReportDatas(res.data.data.data_list);
            setTotalQty(res.data.data.total_quantity);
            setTotalAmount(res.data.data.total_amount);
            setTotalDiscount(res.data.data.total_discount);
            setTotalNetSale(res.data.data.total_netsale);
            console.log(res)
        }).catch((err) => {
            setLoading(false);
            handleError(err, router);
        });
    }, [fromDate, toDate, router]);

    useEffect(() => {
        fetchItems();
      }, [router]);

    const handlePdfBtnClick = async () => {
        try {
            setLoading(true);

            const response = await httpGet("/api/download-daily-sale-report", { responseType: 'blob' });

            setLoading(false);

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const filename = response.headers['content-disposition']?.split('=')[1] || 'downloaded_file.pdf';

            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = filename;

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            console.log('File downloaded successfully');
        } catch (error) {
            setLoading(false);
            console.error('Error downloading file:', error.message);
            handleError(error, router);
        }
    };

    return (
        <div className="px-2 pr-6 pb-6">
            {/* Search Box */}
            <div className="mb-4 justify-between flex">
                <div className="w-auto pr-2">
                    <input
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        type="date"
                        className="p-2 rounded-lg border transition focus:border-white focus:outline-none focus:ring-2 focus:ring-c4c4c4"
                    />
                </div>
                <div className="w-auto pl-2">
                    <input
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        type="date"
                        className="p-2 rounded-lg border transition focus:border-white focus:outline-none focus:ring-2 focus:ring-c4c4c4"
                    />
                </div>
                <div className="w-auto pl-2">
                    <button onClick={fetchItems} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Search
                    </button>
                </div>
                <div className="flex-1 flex items-end justify-end">
                    {reportDatas && reportDatas.length > 0 && <span onClick={handlePdfBtnClick}><PDFIcon /></span>}
                </div>
            </div>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200"> 
                        <tr className=" text-left">
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Item Name</th>
                            <th className="py-2 px-4 border-b text-center">Quantity</th>
                            <th className="py-2 px-4 border-b text-center">Amount</th>
                            <th className="py-2 px-4 border-b text-center">Discount</th>
                            <th className="py-2 px-4 border-b text-center">Net Sale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportDatas.map((reportData) => (
                            <tr key={reportData.item_id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{reportData.item_id}</td>
                                <td className="py-2 px-4 border-b">{reportData.item_name}</td>
                                <td className="py-2 px-4 border-b text-right">{reportData.quantity}</td>
                                <td className="py-2 px-4 border-b text-right">
                                    {money.format(reportData.amount)}
                                </td>
                                <td className="py-1 px-2 border-b text-right">{money.format(reportData.discount)}</td>
                                <td className="py-1 px-2 border-b text-right">{money.format(reportData.netsale)}</td>
                            </tr>
                        ))}
                        {reportDatas && reportDatas.length > 0 && <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b font-bold text-center" colSpan={2}>Total</td>
                            <td className="py-2 px-4 border-b text-right font-bold">{totalQty}</td>
                            <td className="py-2 px-4 border-b text-right font-bold">
                                {money.format(totalAmount)}
                            </td>
                            <td className="py-1 px-2 border-b text-right font-bold">{money.format(totalDiscount)}</td>
                            <td className="py-1 px-2 border-b text-right font-bold">{money.format(totalNetSale)}</td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
function PDFIcon() {
    return (
        <div className="flex over:bg-gray-200 hover:cursor-pointer">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1536 1792"><path fill="red" d="M1468 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28H96q-40 0-68-28t-28-68V96q0-40 28-68T96 0h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22m384 1528V640H992q-40 0-68-28t-28-68V128H128v1536zm-514-593q33 26 84 56q59-7 117-7q147 0 177 49q16 22 2 52q0 1-1 2l-2 2v1q-6 38-71 38q-48 0-115-20t-130-53q-221 24-392 83q-153 262-242 262q-15 0-28-7l-24-12q-1-1-6-5q-10-10-6-36q9-40 56-91.5t132-96.5q14-9 23 6q2 2 2 4q52-85 107-197q68-136 104-262q-24-82-30.5-159.5T657 552q11-40 42-40h22q23 0 35 15q18 21 9 68q-2 6-4 8q1 3 1 8v30q-2 123-14 192q55 164 146 238m-576 411q52-24 137-158q-51 40-87.5 84t-49.5 74m398-920q-15 42-2 132q1-7 7-44q0-3 7-43q1-4 4-8q-1-1-1-2q-1-2-1-3q-1-22-13-36q0 1-1 2zm-124 661q135-54 284-81q-2-1-13-9.5t-16-13.5q-76-67-127-176q-27 86-83 197q-30 56-45 83m646-16q-24-24-140-24q76 28 124 28q14 0 18-1q0-1-2-3" /></svg>
            </div>
        </div>
    );
}