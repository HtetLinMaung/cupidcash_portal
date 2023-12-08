import { dashboardContext } from '@/providers/DashboardProvider';
import {useContext} from 'react';

export default function TableCard({
  id,
  table_number,
  order_id,
  isActive,
  onClick = () => {},
}) {
  const {selectedTable} = useContext(dashboardContext);
 
  return (
    <div
      style={{
        // backgroundColor: isActive ? "#3C82F6" : "#fff",
        backgroundColor: order_id != 0 ? "#a78bfa" : "#fff",
        // opacity: order_id != 0 ? "0.7" : "1"
      }}
      onClick={onClick}
      className= {`bg-white rounded-md shadow p-4 cursor-pointer transform hover:-translate-y-2 transition duration-300 ease-in-out hover:shadow-customShadow ${selectedTable && order_id != 0 ? "border-solid border-2 " : ""}`}
    >
      <p
        className="font-bold text-gray-800"
        style={{ color: order_id != 0 ? "#2d3748" : "" }}
      >
        #{id}
      </p>
      <p
        style={{ color: order_id != 0 ? "#718096" : "" }}
        className="text-gray-600"
      >
        {table_number}
      </p>
    </div>
  );
}
