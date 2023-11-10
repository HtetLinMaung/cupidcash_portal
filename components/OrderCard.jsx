export default function OrderCard({
  id,
  tableNumber,
  waiterName,
  isActive,
  onClick = () => {},
}) {
  console.log;
  return (
    <div
      style={{
        backgroundColor: isActive ? "#3C82F6" : "#fff",
      }}
      onClick={onClick}
      className={`bg-white rounded-md shadow p-4 cursor-pointer`}
    >
      <p
        className="font-bold text-gray-800"
        style={{ color: isActive ? "#fff" : "" }}
      >
        #{id}
      </p>
      <p style={{ color: isActive ? "#fff" : "" }} className="text-gray-600">
        {tableNumber}
      </p>
      <p style={{ color: isActive ? "#fff" : "" }} className="text-gray-600">
        {waiterName}
      </p>
    </div>
  );
}
