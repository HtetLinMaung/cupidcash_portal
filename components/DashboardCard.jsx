import React from "react";

export default function DashboardCard({
  shopName,
  children // Use props.children to get the child components
}) {
  return (
    <div className="mb-10"><p>{shopName}</p>
      <div className="bg-transparent w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
        {children}
      </div>
    </div>
  );
}