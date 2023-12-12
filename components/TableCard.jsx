import { dashboardContext } from "@/providers/DashboardProvider";
import { useContext } from "react";

export default function TableCard({
  id,
  table_number,
  order_id,
  isActive,
  onClick = () => {},
}) {
  const { selectedTable } = useContext(dashboardContext);

  return (
    <div
      style={{
        backgroundColor: order_id !== 0 ? "var(--fourth-color)" : "#fff",
        border:
          selectedTable === id
            ? "2px solid var(--fourth-color)"
            : "2px solid transparent",
      }}
      onClick={onClick}
      className={`bg-white rounded-md shadow p-4 cursor-pointer transform hover:-translate-y-2   transition duration-300 ease-in-out  `}
    >
      <p
        className="font-bold text-gray-800"
        style={{ color: order_id != 0 ? "var( --secondary-color)" : "" }}
      >
        #{id}
      </p>
      <p
        style={{ color: order_id != 0 ? "var( --secondary-color)" : "" }}
        className="text-gray-600"
      >
        {table_number}
      </p>
    </div>
  );
}
