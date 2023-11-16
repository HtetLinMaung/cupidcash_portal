"use client";

import LoadingBar from "@/components/LoadingBar";

import Sidebar from "@/components/Sidebar";
import { socketio_domain } from "@/constants";
import { appContext } from "@/providers/AppProvider";
import { notificationContext } from "@/providers/NotificationProvider";
import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
export default function DashboardLayout({ children }) {
  const { loading } = useContext(appContext);
  const{orderId,setOrderId}= useContext(notificationContext);
  useEffect(() => {
    const socket = io(socketio_domain);

    socket.on("connect", () => {
      console.log("SocketIO connection established.");
      console.log(`socket_id: ${socket.id}`);
      const token = localStorage.getItem("cupidcash_token");
      socket.emit("join", { token });
      socket.on("new-order", (data) => {
        setOrderId(data.order_id);
        toast.success(1, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    });
  }, []);

  return (
    <html lang="en">
      <body>

        {loading ? <LoadingBar /> : null}
        <div className="flex">
          <Sidebar />
          <div className="pl-20 flex-grow bg-gray-100">{children}</div>
               {/* Same as */}
               <ToastContainer />
        </div>
      </body>
    </html>
  );
}
