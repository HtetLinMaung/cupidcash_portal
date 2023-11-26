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
import RightSectionCard from "@/components/RightSectionCard";
import RightSectionButtom from "@/components/RightSectionButtom";

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
        className="flex-grow  pt-8"
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
                className="w-full p-4 rounded-md border transition focus:border-white focus:outline-none focus:ring-2 focus:ring-c4c4c4"
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
                        document.getElementById("my_modal_2").showModal();
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
      <RightSectionCard order={order}>
        {order.items.map((item, index) => (
          <RightSectionButtom
            key={index}
            item={item}
            index={index}
          ></RightSectionButtom>
        ))}
      </RightSectionCard>

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
