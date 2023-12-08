"use client";
import Breadcrumb from "@/components/Breadcrumb";
import { useEffect, useRef } from "react";

const breadcrumbItems = [{ label: "Home", href: "/dashboard" }];
export default function NavBar() {
  const searchInputRef = useRef(null);
  const breadcrumbItems = [
    { text: "Home", href: "/dashboard" },
    { text: currentPage },
  ];
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if Ctrl (or Command on Mac) + K is pressed
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        // Prevent the default browser behavior for this key combination
        event.preventDefault();

        // Focus on the search input
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    // Add event listener for keypress
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className=" navbar " style={{ paddingLeft: "2%" }}>
      <div class="flex-1 ">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div class="dropdown dropdown-end ">
        <input
          type="text"
          placeholder="Search Ctrl+K"
          class="input  bg-gray-100 rounded-full p-4 w-72"
          ref={searchInputRef}
        />
      </div>
    </div>
  );
}
