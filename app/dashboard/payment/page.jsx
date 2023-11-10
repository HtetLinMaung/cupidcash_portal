"use client";
import Breadcrumb from "@/components/Breadcrumb";
import OrderCard from "@/components/OrderCard";
import { getOrders } from "@/services/order";
import { handleError } from "@/utils/rest-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Payment" },
];

export default function Payment() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(999);

  const [selectedOrder, setSelectedOrder] = useState(0);

  useEffect(() => {
    getOrders({ search })
      .then((res) => {
        if (res.data.code != 200) {
          return Swal.fire({
            title: "",
            text: res.data.message || "Something went wrong!",
            showConfirmButton: false,
            timer: 5000,
          });
        }

        setOrders(res.data.data);
        // if (res.data.data.length) {
        //   setSelectedOrder(res.data.data[0]);
        // }
      })
      .catch((err) => handleError(err, router));
  }, [search, router]);

  return (
    <div className="flex h-screen">
      <div className="flex-grow bg-gray-100 pt-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex-grow overflow-auto">
          <div className="m-8">
            <div className="mb-4 flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                VIEW PAYMENT HISTORY
              </button>
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Repeat this div for each card, use a map function for real data */}
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  id={order.id}
                  tableNumber={order.table_number}
                  waiterName={order.waiter_name}
                  isActive={selectedOrder == order.id}
                  onClick={() => {
                    console.log("click");
                    setSelectedOrder(order.id);
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
          width: selectedOrder == 0 ? 0 : "24rem",
          maxWidth: selectedOrder == 0 ? 0 : "24rem",
          padding: selectedOrder == 0 ? 0 : "2rem",
          opacity: selectedOrder == 0 ? 0 : 1,
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

        {/* Checkout button */}
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          CHECKOUT
        </button>
      </div>
    </div>
  );
}
