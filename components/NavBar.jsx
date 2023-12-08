"use client";

import { useEffect, useRef } from "react";

export default function NavBar() {
  const searchInputRef = useRef(null);

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
    <div className=" navbar bg-white nav">
      <div class="flex-1 ">
        <input
          type="text"
          placeholder="Search Ctrl+K"
          class="w-32 md:w-auto h-10 p-4 rounded-lg  focus:outline-none focus:ring-transparent focus:shadow-customShadow2 transition-shadow ease-in-out duration-200"
          ref={searchInputRef}
        />
      </div>

      <div class="dropdown dropdown-end flex-none">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle avatar flex-none"
        >
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
