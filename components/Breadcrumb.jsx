"use client";
import { navContext } from "@/providers/navProvider";
import { useContext, useEffect, useState } from "react";

// components/Breadcrumb.js
function Breadcrumb() {
  const { href } = useContext(navContext);
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { label: "Home", href: "/dashboard" },
  ]);

  useEffect(() => {
    setBreadcrumbItems((prevItems) => [
      // Keep all items except the last one
      { label: "Home", href: "/dashboard" },
      { label: href }, // Add a new item with the updated href
    ]);
  }, [href]);

  return (
    <nav className="text-gray-500  text-sm mb-0">
      {breadcrumbItems.map((item, index) => (
        <span key={item.label}>
          {index > 0 && " > "}
          {item.href ? (
            <a
              href={item.href}
              className=" hover:underline"
              style={{ color: "#7468D4" }}
            >
              {item.label}
            </a>
          ) : (
            item.label
          )}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;
