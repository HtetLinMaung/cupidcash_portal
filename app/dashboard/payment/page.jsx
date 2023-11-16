"use client";
import Breadcrumb from "@/components/Breadcrumb";
import OrderCard from "@/components/OrderCard";
import { server_domain } from "@/constants";
import { getOrderDetails, getOrders } from "@/services/order";
import { handleError } from "@/utils/rest-client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import money from "mm-money";
import { paymentContext } from "@/providers/PaymentProvider";
import { appContext } from "@/providers/AppProvider";
import { notificationContext } from "@/providers/NotificationProvider";
import { ToastContainer, toast } from "react-toastify";

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Payment" },
];

export default function Payment() {
  const{orderId}= useContext(notificationContext);
  const router = useRouter();
  const { setLoading } = useContext(appContext);
  const {
    orders,
    setOrders,
    order,
    setOrder,
    subTotal,
    setSubTotal,
    search,
    setSearch,
    selectedOrder,
    setSelectedOrder,
  } = useContext(paymentContext);

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
          let total = 0;
          for (const item of res.data.data.items) {
            total += item.price;
          }
          setSubTotal(total);
        })
        .catch((err) => handleError(err, router));
    }

  }, [selectedOrder]);

  useEffect(() => {
    setLoading(true);
    getOrders({ search })
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

        setOrders(res.data.data);
        // if (res.data.data.length) {
        //   setSelectedOrder(res.data.data[0]);
        // }
      })
      .catch((err) => {
        setLoading(false);
        handleError(err, router);
      });
      toast(orderId, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  }, [search, router,orderId]);

  return (
    <div className="pl-2 flex">
      <div
        className="flex-grow bg-gray-100 pt-8"
        style={{ paddingRight: selectedOrder == 0 ? 0 : "24rem" }}
      >
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
        {/* Summary section */}
        <div className="mb-4 px-8">
          <div className="mb-2 pt-4">
            <p>
              Sub Total{" "}
              <span className="float-right">{money.format(subTotal)} Ks</span>
            </p>
            <p>
              Discount <span className="float-right">-</span>
            </p>
            <p>
              Tax <span className="float-right">-</span>
            </p>
          </div>
          <div className="mb-4">
            <p>
              Total
              <span className="float-right">{money.format(subTotal)} Ks</span>
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
        <div className="px-8">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
