"use client";
import Breadcrumb from "@/components/Breadcrumb";
import TableCard from "@/components/TableCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTables } from "@/services/table";
import { handleError } from "@/utils/rest-client";

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
];

export default function Dashboard() {
  const router = useRouter();
  const [tables, setTables] = useState([]);
  const [search, setSearch] = useState("");
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(999);
  const [selectedTable, setSelectedTable] = useState(0);
  useEffect(() => {
    getTables({ search })
      .then((res) => {
        if (res.data.code != 200) {
          return Swal.fire({
            title: "",
            text: res.data.message || "Something went wrong!",
            showConfirmButton: false,
            timer: 5000,
          });
        }

        setTables(res.data.data);
        // if (res.data.data.length) {
        //   setSelectedOrder(res.data.data[0]);
        // }
      })
      .catch((err) => handleError(err, router));
  }, [search, router]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-grow bg-gray-100 pt-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex-grow overflow-auto">
          <div className="m-8">
            {/* Search bar */}
            <div className="mb-4">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Type to search..."
                className="w-full p-4 rounded-md"
              />
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-4">
              {/* Repeat this div for each card, use a map function for real data */}
              {tables.map((table) => (
                <TableCard
                  key={table.id}
                  id={table.id}
                  tableNumber={table.description}
                  waiterName={table.description}
                  isActive={selectedTable == table.id}
                  onClick={() => {
                    console.log("click");
                    setSelectedTable(table.id);
                  }}
                />
              ))}
              {/* <div className="bg-white rounded-md shadow p-4">
                <p>DN-0012A</p>
                <p>A10 - 1st Floor</p>
                <p>Difana Wilson</p>
              </div> */}
              {/* ... other cards */}
            </div>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div
        className="flex flex-col w-96 bg-gray-800 text-white p-8"
        style={{
          width: selectedTable == 0 ? 0 : "24rem",
          maxWidth: selectedTable == 0 ? 0 : "24rem",
          padding: selectedTable == 0 ? 0 : "2rem",
          opacity: selectedTable == 0 ? 0 : 1,
        }}
      >
        {/* Payment history button */}

        <div className="flex-grow overflow-y-auto"></div>
        {/* Summary section */}
        <div className="mb-4">
          <div className="mb-2">
            <p>
              Sub Total <span className="float-right">$20</span>
            </p>
            <p>
              Discount <span className="float-right">-</span>
            </p>
            <p>
              Tax <span className="float-right">$3</span>
            </p>
          </div>
          <div className="mb-4">
            <p>
              Total <span className="float-right">$23</span>
            </p>
          </div>
          <div className="mb-4">
            <p>
              Payment Method <span className="float-right">Cash</span>
            </p>
          </div>
        </div>

        {/* <div className="grid grid-cols-3 gap-2 mb-4">
          <button className="p-4 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-600">
            1
          </button>
        </div> */}

        {/* Reserve button */}
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Reserve
        </button>
        {/* Cancel button */}
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => {
          setSelectedTable(0);
        }}>
          CANCEL
        </button>
      </div>
    </div>
  );
}
