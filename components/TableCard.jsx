export default function TableCard({
  id,
  table_number,
  order_id,
  isActive,
  onClick = () => {},
}) {
  return (
    <div
      style={{
        // backgroundColor: isActive ? "#3C82F6" : "#fff",
        backgroundColor: order_id != 0 ? "#3C82F6" : "#fff",
        // opacity: order_id != 0 ? "0.7" : "1"
      }}
      onClick={onClick}
      className={`bg-white rounded-md shadow p-4 cursor-pointer`}
    >
      <p
        className="font-bold text-gray-800"
        style={{ color: order_id != 0 ? "#fff" : "" }}
      >
        #{id}
      </p>
      <p
        style={{ color: order_id != 0 ? "#fff" : "" }}
        className="text-gray-600"
      >
        {table_number}
      </p>
    </div>
  );
}
