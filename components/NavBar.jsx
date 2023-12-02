"use client";

import { useEffect, useRef, useState } from "react";

export default function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleKeyDown = (event) => {
    // Check if Ctrl+K is pressed
    if (event.ctrlKey && event.key === "k") {
      // Open the search input
      setIsSearchOpen(true);
    }
  };

  useEffect(() => {
    // Attach the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div
      className=" navbar "
      style={{ padding: "0px", backgroundColor: "#7468D4" }}
    >
      <div
        tabindex="0"
        role="button"
        class="btn btn-ghost w-16 btn-circle avatar flex-none"
      >
        <div class="w-10 rounded-full">
          <img src="/pos_logo.png" alt="Default Product Image" />
        </div>
      </div>

      <div class="flex-1 pl-10">
        <input
          type="text"
          placeholder="Search Crt+K"
          class="input input-bordered w-24 md:w-auto"
          ref={searchInputRef}
          style={{ autofocus: isSearchOpen ? "block" : "none" }}
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
