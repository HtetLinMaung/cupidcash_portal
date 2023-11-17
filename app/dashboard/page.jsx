"use client";
import Breadcrumb from "@/components/Breadcrumb";
import TableCard from "@/components/TableCard";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { server_domain } from "@/constants";
import { getDashboardData } from "@/services/table";
import { getOrderDetails } from "@/services/order";
import { handleError, httpPut } from "@/utils/rest-client";
import { dashboardContext } from "@/providers/DashboardProvider";
import money from "mm-money";
import { appContext } from "@/providers/AppProvider";
import Swal from "sweetalert2";

const breadcrumbItems = [{ label: "Home", href: "/dashboard" }];

export default function Dashboard() {
  const { setLoading } = useContext(appContext);
  const router = useRouter();
  const {
    tables,
    setTables,
    order,
    setOrder,
    search,
    setSearch,
    selectedOrder,
    setSelectedOrder,
    selectedTable,
    setSelectedTable
  } = useContext(dashboardContext);

  useEffect(() => {
    loadDashboardData({search});
  }, [search, router]);

  useEffect(() => {
    if (selectedOrder) {
      getOrderDetails(selectedOrder)
        .then((res) => {
          if (res.data.code != 200) {
            return Swal.fire({
              title: "",
              text: res.data.message || "Something went wrong!",
              showConfirmButton: false,
              timer: 5000,
            });
          }

          setOrder(res.data.data);
        })
        .catch((err) => handleError(err, router));
    }

  }, [selectedOrder]);

  const loadDashboardData = (search) =>{
    getDashboardData(search)
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
      })
      .catch((err) => handleError(err, router));
  }

  const updateOrderStatus = async (status, order_id) => {
    try {
      setLoading(true);
      const res = await httpPut(`/api/orders/${order_id}`, { "status": status });
      setLoading(false);
      Swal.fire({
        icon: "success",
        text: `Order ${status} Successfully.`,
        showConfirmButton: false,
        timer: 5000,
      });
      loadDashboardData({search});
      setSelectedOrder(0);
    } catch (err) {
      setLoading(false);
      handleError(err, router);
    }
  };

  return (
    <div className="pl-2 flex">
      <div className="flex-grow bg-gray-100 pt-8"
        style={{ paddingRight: selectedOrder == 0 ? 0 : "24rem" }}
      >
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
                  key={table.id + "&" + table.order_id}
                  id={table.id}
                  order_id={table.order_id}
                  table_number={table.table_number}
                  isActive={selectedOrder == table.order_id && selectedTable == table.id}
                  onClick={() => {
                    if (table.order_id) {
                      setSelectedOrder(table.order_id);
                      setSelectedTable(table.id);
                    }
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
        className="flex flex-col w-96 bg-gray-800 text-white py-8 fixed top-0 bottom-0 right-0"
        style={{
          width: selectedOrder == 0 ? 0 : "24rem",
          maxWidth: selectedOrder == 0 ? 0 : "24rem",
          padding: selectedOrder == 0 ? 0 : "2rem 0",
          opacity: selectedOrder == 0 ? 0 : 1,
        }}
      >
        {/* Display order information */}
        <div className="mb-8 px-8">
          <h3 className="text-lg font-bold">#{order.id}</h3>
          <p>Waiter: {order.waiter_name}</p>
          <p>Table: {order.table_number}</p>
          <p>Time: {new Date(order.created_at + "Z").toLocaleString()}</p>
          <div><p>Status: {order.status}</p></div>
        </div>

        <div className="flex-grow overflow-y-auto pl-8">
          {/* Loop over items array */}
          {order.items.map((item, index) => (
            <div key={index} className="mb-4 flex">
              <img
                src={server_domain + item.image_url}
                alt={item.item_name}
                className="h-20 w-20 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              />
              <div className="px-4 flex flex-col justify-between leading-normal">
                <h5 className="text-md font-bold">{item.item_name}</h5>
                <p className="text-sm">{item.description}</p>
                <p className="text-sm">Qty: {item.quantity}</p>
                {item.special_instructions && (
                  <p className="text-sm">Notes: {item.special_instructions}</p>
                )}
                <p className="text-md">{money.format(item.price)} Ks</p>
              </div>
            </div>
          ))}
        </div>

        {/* Serve button */}
        <div className="px-8">
          <button className={`w-full text-white font-bold py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded ${order.status=="Served" ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => { updateOrderStatus("Served", selectedOrder) }}>
            SERVE
          </button>
        </div>
        {/* Cancel button */}
        <div className="px-8 mt-3">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => { updateOrderStatus("Canceled", selectedOrder) }}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
