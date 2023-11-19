"use client";
import Breadcrumb from "@/components/Breadcrumb";
import OrderCard from "@/components/OrderCard";
import { server_domain } from "@/constants";
import { getOrderDetails, getOrders } from "@/services/order";
import { handleError, httpGet } from "@/utils/rest-client";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import moment from "moment";
import { paymentContext } from "@/providers/PaymentProvider";
import { appContext } from "@/providers/AppProvider";
import { notificationContext } from "@/providers/NotificationProvider";
import Pagination from "@/components/Pagination";
import Link from "next/link";
const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Payment", href: "/dashboard/payment" },
    {label:"PaymentHistory"}
];

export default function PaymentHistory() {
    const { orderId } = useContext(notificationContext);
    const router = useRouter();
    const { setLoading } = useContext(appContext);
    const {
        orders,
        setOrders,
        order,
        setOrder,
        subTotal,
        setSubTotal,
        search,
        setSearch,
        selectedOrder,
        setSelectedOrder,
        total,
        setTotal,
        page,
        setPage,
        perPage,
        setPerPage,
        pageCounts,
        setPageCounts,
    } = useContext(paymentContext);

    const fetchOrders = useCallback(() => {
        setLoading(true);
        httpGet("/api/orders", {
          params: {
            page,
            per_page: perPage,
            search,
          },
        })
          .then((res) => {
            setLoading(false);
            setTotal(res.data.total);
            setPageCounts(res.data.page_counts);
            setOrders(res.data.data);
          })
          .catch((err) => {
            setLoading(false);
            handleError(err, router);
          });
      }, [page, perPage, router, search]);

    useEffect(() => {
        setLoading(true);
        fetchOrders();
    }, [page, perPage,search, router, orderId,fetchOrders]);
    return (
        <div className="px-2 pr-6 pb-6">
            <div className="flex-grow bg-gray-100 pt-8 mb-6">
                <Breadcrumb items={breadcrumbItems} />
            </div>



            {/* Search Box */}
            <div className="flex mb-4 justify-between">
                <div>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search Payment..."
                        className="p-2 border rounded-lg"
                    />
                </div>
            </div>

            <div className="my-4">
                <span className="text-gray-600 font-medium">Total Payment: </span>
                <span className="text-black font-bold">{total}</span>
            </div>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr className=" text-left">
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Table Name</th>
                        <th className="py-2 px-4 border-b">Shop Name</th>
                        <th className="py-2 px-4 border-b">Time</th>
                  
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{order.id}</td>
                            <td className="py-2 px-4 border-b">{order.table_number}</td>
                            <td className="py-2 px-4 border-b">{order.waiter_name}</td>
                            <td className="py-2 px-4 border-b">
                                {moment(order.created_at + "Z").format("DD/MM/YYYY hh:mm:ss a")}
                            </td>
                          
                        
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination Controls */}
            <Pagination
                page={page}
                pageCounts={pageCounts}
                onPageChange={setPage}
                perPage={perPage}
                onPerPageChange={(p) => {
                    setPerPage(p);
                    setPage(1);
                }}
            />
        </div>
    )
}