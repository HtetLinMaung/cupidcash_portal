import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <div className="pl-20 flex-grow bg-gray-100">{children}</div>
        </div>
      </body>
    </html>
  );
}
