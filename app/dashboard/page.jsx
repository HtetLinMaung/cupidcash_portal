"use client";
import Breadcrumb from "@/components/Breadcrumb";
import TableCard from "@/components/TableCard";
import { useRouter } from "next/navigation";
import { useEffect, useContext, useState } from "react";
import { server_domain } from "@/constants";
import { getTables } from "@/services/table";
import { getOrderDetails } from "@/services/order";
import { handleError, httpPut, httpPost } from "@/utils/rest-client";
import { dashboardContext } from "@/providers/DashboardProvider";
import money from "mm-money";
import { appContext } from "@/providers/AppProvider";
import Swal from "sweetalert2";
import CustomModal from "@/components/CutomModal";
import TableForm from "@/components/TableForm";
import { getShops } from "@/services/shop";
import DashboardCard from "@/components/DashboardCard";
import { tableContext } from "@/providers/TableProvider";
import { notificationContext } from "@/providers/NotificationProvider";

const breadcrumbItems = [{ label: "Home", href: "/dashboard" }];

export default function Dashboard() {
  const { setLoading } = useContext(appContext);
  const { orderId } = useContext(notificationContext);
  const router = useRouter();
  const {
    showModel,
    setShowModel,
    shops,
    setShops,
    shopTables,
    setShopTables,
    order,
    setOrder,
    search,
    setSearch,
    selectedOrder,
    setSelectedOrder,
    selectedTable,
    setSelectedTable,
    selectedShop,
    setSelectedShop,
  } = useContext(dashboardContext);

  const { tables, setTables } = useContext(tableContext);

  useEffect(() => {
    loadTables({ search });
  }, [search, router, orderId]);

  useEffect(() => {
    if (selectedOrder) {
      setLoading(true);
      getOrderDetails(selectedOrder)
        .then((res) => {
          setLoading(false);
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
        .catch((err) => {
          setLoading(false);
          handleError(err, router);
        });
    }
  }, [selectedOrder]);

  const loadTables = (search) => {
    setLoading(true);
    getTables(search)
      .then((res) => {
        setLoading(false);
        if (res.data.code != 200) {
          return Swal.fire({
            title: "",
            text: res.data.message || "Something went wrong!",
            showConfirmButton: false,
            timer: 5000,
          });
        }
        setTables(res.data.data);

        // Grouping the data by shop_id
        setShopTables(
          res.data.data.reduce((acc, table) => {
            const { shop_id, shop_name, ...rest } = table;
            if (!acc[shop_id]) {
              acc[shop_id] = { shop_id, shop_name, tables: [] };
            }
            acc[shop_id].tables.push(rest);
            return acc;
          }, {})
        );
      })
      .catch((err) => {
        setLoading(false);
        handleError(err, router);
      });
  };

  const handleClose = () => {
    setShowModel(false);
  };

  const createTable = async (data) => {
    try {
      data.shop_id = parseInt(data.shop_id);
      if (!data.shop_id) {
        throw new Error("Invalid shop!");
      }
      setLoading(true);
      const res = await httpPost("/api/tables", data);
      setLoading(false);
      Swal.fire({
        icon: "success",
        text: res.data.message,
        showConfirmButton: false,
        timer: 5000,
      });
      setShowModel(false);
      loadTables({ search });
    } catch (err) {
      setLoading(false);
      handleError(err, router);
    }
  };

  const loadShops = (shop_id) => {
    setLoading(true);
    getShops()
      .then((res) => {
        setLoading(false);
        setShops(res.data.data.map((s) => ({ value: s.id, label: s.name })));
      })
      .catch((err) => {
        setLoading(false);
        handleError(err, router);
      });
  };

  return (
    <div className="pl-2 flex">
      <div
        className="flex-grow bg-gray-100 pt-8"
        style={{ paddingRight: selectedTable == 0 ? 0 : "24rem" }}
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

            {
              // Loop through the hash map
              Object.values(shopTables).map((shop) => (
                <DashboardCard key={shop.shop_id} shopName={shop.shop_name}>
                  {/* Repeat this div for each card, use a map function for real data */}
                  {shop.tables.map((table) => (
                    <TableCard
                      key={table.id + "&" + table.order_id}
                      id={table.id}
                      order_id={table.order_id}
                      table_number={table.table_number}
                      isActive={
                        selectedOrder === table.order_id &&
                        selectedTable === table.id
                      }
                      onClick={() => {
                        if (table.order_id) {
                          setSelectedOrder(table.order_id);
                          setSelectedTable(table.id);
                        } else {
                          setSelectedTable(0);
                        }
                      }}
                    />
                  ))}
                  {/* "ADD TABLE" button */}
                  <div className={`bg-transparent pt-6 pb-6 cursor-pointer`}>
                    <p
                      className="font-bold text-blue-500 ml-auto mr-auto"
                      onClick={() => {
                        setShowModel(true);
                        loadShops();
                        setSelectedShop(shop.shop_id);
                      }}
                    >
                      + ADD TABLE
                    </p>
                  </div>
                </DashboardCard>
              ))
            }

            {/* <div className="bg-white rounded-md shadow p-4">
                <p>DN-0012A</p>
                <p>A10 - 1st Floor</p>
                <p>Difana Wilson</p>
              </div> */}
            {/* ... other cards */}
          </div>
        </div>
      </div>

      {/* Right section */}
      <div
        className="flex flex-col w-96 bg-gray-800 text-white py-8 fixed top-0 bottom-0 right-0"
        style={{
          width: selectedTable == 0 ? 0 : "24rem",
          maxWidth: selectedTable == 0 ? 0 : "24rem",
          padding: selectedTable == 0 ? 0 : "2rem 0",
          opacity: selectedTable == 0 ? 0 : 1,
        }}
      >
        {/* Display order information */}
        <div className="mb-8 px-8">
          <h3 className="text-lg font-bold">#{order.id}</h3>
          <p>Waiter: {order.waiter_name}</p>
          <p>Table: {order.table_number}</p>
          <p>Time: {new Date(order.created_at + "Z").toLocaleString()}</p>
          <div>
            <p>Status: {order.status}</p>
          </div>
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
                {/* <p className="text-sm">{item.description}</p> */}
                <p className="text-sm">Qty: {item.quantity}</p>
                {item.special_instructions && (
                  <p className="text-sm">Notes: {item.special_instructions}</p>
                )}
                <p className="text-md">{money.format(item.price)} Ks</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reserve button */}
        {/* <div className="px-8">
          <button className={`w-full text-white font-bold py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded ${order.status == "Served" ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => { console.log("reserve") }}>
            RESERVE
          </button>
        </div> */}
        {/* Cancel button */}
        {/* <div className="px-8 mt-3">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => { console.log("reserve cancel"); setSelectedTable(0) }}>
            CANCEL
          </button>
        </div> */}
      </div>
      <CustomModal showModel={showModel} handleClose={handleClose}>
        <TableForm
          shopId={selectedShop}
          shops={shops}
          onSubmit={createTable}
          onBackClick={handleClose}
        />
      </CustomModal>
    </div>
  );
}
