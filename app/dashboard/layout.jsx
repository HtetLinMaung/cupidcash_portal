"use client";

import LoadingBar from "@/components/LoadingBar";

import Sidebar from "@/components/Sidebar";
import { socketio_domain } from "@/constants";
import { appContext } from "@/providers/AppProvider";
import { useContext, useEffect } from "react";
import { io } from "socket.io-client";

export default function DashboardLayout({ children }) {
  const { loading } = useContext(appContext);
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
    <html lang="en">
      <body>
        {loading ? <LoadingBar /> : null}
        <div className="flex">
          <Sidebar />
          <div className="pl-20 flex-grow bg-gray-100">{children}</div>
        </div>
      </body>
    </html>
  );
}
