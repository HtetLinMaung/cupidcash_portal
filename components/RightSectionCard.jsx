import { dashboardContext } from "@/providers/DashboardProvider";
import { paymentContext } from "@/providers/PaymentProvider";
import React, { useContext } from "react";

export default function RightSectionCard({ order, children }) {
  const { selectedTable, setSelectedTable } = useContext(dashboardContext);
  return (
    <div
      className="flex flex-col w-96 bg-gray-800 text-white py-8 fixed top-0 bottom-0 right-0"
      style={{
        width: selectedTable == 0 ? 0 : "24rem",
        maxWidth: selectedTable == 0 ? 0 : "24rem",
        padding: selectedTable == 0 ? 0 : "2rem 0",
        opacity: selectedTable == 0 ? 0 : 1,
      }}
    >
      <div className="flex">
        <div
          className="absolute left-[-3%] pt-1% w-31 h-31  bg-gray-800  rounded-full p-1 w-6 h-6 shadow-md"
          style={{ boxShadow: "0 0 2px 2px #696969" }}
          onClick={() => {
            setSelectedTable(0);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="mb-8 px-8">
          <h3 className="text-lg font-bold">#{order.id}</h3>
          <p>Waiter: {order.waiter_name}</p>
          <p>Table: {order.table_number}</p>
          <p>Time: {new Date(order.created_at + "Z").toLocaleString()}</p>
          <div>
            <p>Status: {order.status}</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
