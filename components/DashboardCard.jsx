import React from "react";

export default function DashboardCard({
  shopName,
  children, // Use props.children to get the child components
}) {
  return (
    <div className="mb-10 ">
      <p className="mb-2 ">{shopName}</p>
      <div className="bg-transparent w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-4 ">
        {children}
      </div>
    </div>
  );
}
