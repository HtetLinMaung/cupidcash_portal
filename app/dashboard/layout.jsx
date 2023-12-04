"use client";

import LoadingBar from "@/components/LoadingBar";

import Sidebar from "@/components/Sidebar";
import { socketio_domain } from "@/constants";
import { appContext } from "@/providers/AppProvider";
import { notificationContext } from "@/providers/NotificationProvider";
import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { handleError } from "@/utils/rest-client";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { getOrderDetails } from "@/services/order";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { loading } = useContext(appContext);
  const { orderId, setOrderId } = useContext(notificationContext);
  useEffect(() => {
    const socket = io(socketio_domain);

    socket.on("connect", () => {
      console.log("SocketIO connection established.");
      console.log(`socket_id: ${socket.id}`);
      const token = localStorage.getItem("cupidcash_token");
      socket.emit("join", { token });
      socket.on("new-order", (data) => {
        setOrderId(data.order_id);

        getOrderDetails(data.order_id)
          .then((res) => {
            if (res.data.code != 200) {
              return Swal.fire({
                title: "",
                text: res.data.message || "Something went wrong!",
                showConfirmButton: false,
                timer: 5000,
              });
            }
            const noti =
              "Order #" +
              res.data.data.id +
              ", placed by Waiter " +
              res.data.data.waiter_name +
              " for Table " +
              res.data.data.table_number +
              " received";
            toast.success(noti, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClick: () => {
                router.push("/dashboard/payment");
              },
            });
          })
          .catch((err) => handleError(err));
      });
    });
    return () => {
      socket.off("new-order");
      socket.disconnect();
    };
  }, []);

  return (
    <html lang="en">
      <body>
        {loading ? <LoadingBar /> : null}
        <div className="" style={{ height: "100%" }}>
          <NavBar />
          <div className="flex " style={{ height: "100%" }}>
            <Sidebar />
            <div
              style={{ width: "100%", height: "100%" }}
              className="flex-grow bg-gray-100 pl-32"
            >
              {children}
            </div>
            {/* Same as */}
            <ToastContainer />
          </div>
        </div>
      </body>
    </html>
  );
}
