"use client";

import Sidebar from "@/components/Sidebar";
import { socketio_domain } from "@/constants";
import PaymentProvider from "@/providers/PaymentProvider";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function DashboardLayout({ children }) {
  useEffect(() => {
    const socket = io(socketio_domain);

    socket.on("connect", () => {
      console.log("SocketIO connection established.");
      console.log(`socket_id: ${socket.id}`);
      const token = localStorage.getItem("cupidcash_token");
      socket.emit("join", { token });
    });
  }, []);

  return (
    <PaymentProvider>
      <html lang="en">
        <body>
          <div className="flex">
            <Sidebar />
            <div className="pl-20 flex-grow bg-gray-100">{children}</div>
          </div>
        </body>
      </html>
    </PaymentProvider>
  );
}
