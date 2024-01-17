// components/Sidebar.js
"use client";

import { navContext } from "@/providers/navProvider";
import { useContext } from "react";
import SetupSubBar from "./setupsubbar";

export default function Sidebar() {
  const { setHref } = useContext(navContext);
  const handleSidebarIconClick = (text) => {
    setHref(text);
  };

  return (
    <div
      style={{ paddingTop: "0.5rem " }}
      className="w-full 
                      flex flex-col
                       text-white shadow-lg h-full sidebar"
    >
      <div
        tabIndex="0"
        role="button"
        className=" w-full btn-circle avatar flex"
        style={{
          padding: "0rem 0.5rem",
          gap: "20px",
          width: "100%",
        }}
      >
        <div className=" rounded-full flex mg-auto">
          {" "}
          <img src="/pos_logo.png" alt="Default Product Image" />
        </div>
      </div>
      <SidebarIcon icon={<HomeIcon />} text="Home" href="/dashboard" />
      <SidebarIcon
        icon={<AddOrderIcon />}
        text="Order"
        href="/dashboard/order"
      />
      <SidebarIcon
        icon={<OrderIcon onClick={() => handleSidebarIconClick("Payment")} />}
        text="Payment"
        href="/dashboard/payment"
      />
      <SidebarIcon
        icon={<ReportIcon />}
        text="Reports"
        href="/dashboard/report"
      />
      <SidebarIcon
        icon={<PurchaseIcon />}
        text="Purchase"
        href="/dashboard/purchase"
      />
      <SetupIcon />
      <div className="mt-auto">
        <div className=" dropdown dropdown-end  w-full">
          <SidebarIcon icon={<Profile />} text="Profile" />
          <SidebarIcon icon={<Logout />} text="Logout" />
        </div>
      </div>
      {/* ... other icons */}
    </div>
  );
}

function SidebarIcon({ icon, text = "tooltip 💡", href = "/" }) {
  return (
    <a href={href}>
      <div className="sidebar-icon group w-full ">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </div>
    </a>
  );
}

function HomeIcon() {
  return (
    <div className="flex ">
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 7.99998L11.732 3.13398C11.8152 3.09243 11.907 3.0708 12 3.0708C12.093 3.0708 12.1848 3.09243 12.268 3.13398L22 7.99998M20 11V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V11"
            stroke="var(--secondary-color)"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function OrderIcon({ onClick }) {
  return (
    <div className="flex " onClick={onClick}>
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.10002 9.59999V10.1H3.60002H20.4H20.9V9.59999V8.09999C20.9 7.41042 20.6261 6.7491 20.1385 6.26151C19.6509 5.77392 18.9896 5.49999 18.3 5.49999H5.70002C5.01046 5.49999 4.34914 5.77392 3.86155 6.26151C3.37395 6.7491 3.10002 7.41042 3.10002 8.09999V9.59999ZM20.9 10.8V10.3H20.4H3.60002H3.10002V10.8V15.9C3.10002 17.3353 4.26468 18.5 5.70002 18.5H18.3C18.9896 18.5 19.6509 18.2261 20.1385 17.7385C20.6261 17.2509 20.9 16.5896 20.9 15.9V10.8ZM16.1293 16.1293C16.1481 16.1105 16.1735 16.1 16.2 16.1H18.6C18.6265 16.1 18.652 16.1105 18.6707 16.1293C18.6895 16.148 18.7 16.1735 18.7 16.2C18.7 16.2265 18.6895 16.2519 18.6707 16.2707C18.652 16.2895 18.6265 16.3 18.6 16.3H16.2C16.1735 16.3 16.1481 16.2895 16.1293 16.2707C16.1106 16.2519 16.1 16.2265 16.1 16.2C16.1 16.1735 16.1106 16.148 16.1293 16.1293ZM2.90002 8.09999C2.90002 7.35738 3.19502 6.64519 3.72013 6.12009C4.24523 5.59499 4.95742 5.29999 5.70002 5.29999H18.3C19.0426 5.29999 19.7548 5.59499 20.2799 6.12009C20.805 6.64519 21.1 7.35738 21.1 8.09999V15.9C21.1 16.6426 20.805 17.3548 20.2799 17.8799C19.7548 18.405 19.0426 18.7 18.3 18.7H5.70002C4.95742 18.7 4.24523 18.405 3.72013 17.8799C3.19502 17.3548 2.90002 16.6426 2.90002 15.9V8.09999Z"
            fill="black"
            stroke="var(--secondary-color)"
          />
        </svg>
      </div>
    </div>
  );
}

function SetupIcon() {
  return (
    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content sidebar-icon group w-full ">
        <label for="my-drawer">
          {" "}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
              stroke="var(--secondary-color)"
              stroke-width="1.5"
            />
            <path
              d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
              stroke="var(--secondary-color)"
              stroke-width="1.5"
            />
          </svg>
        </label>
      </div>
      <div class="drawer-side">
        <label
          for="my-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <div class="menu p-4  min-h-full bg-base-200 text-base-content">
          <SetupSubBar />
        </div>
      </div>
    </div>
  );
}

function AddOrderIcon() {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 4H7C5.89543 4 5 4.89543 5 6V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V6C19 4.89543 18.1046 4 17 4Z"
          stroke="var(--secondary-color)"
        />
        <path
          d="M9 9H15M9 13H15M9 17H13"
          stroke="var(--secondary-color)"
          stroke-linecap="round"
        />
      </svg>
    </div>
  );
}

function Profile() {
  return (
    <div
      tabIndex="0"
      role="button"
      className="btn btn-ghost btn-circle avatar flex-none"
    >
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        />
      </div>
    </div>
  );
}
function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("cupidcash_token");
  };
  return (
    <div
      className="btn btn-ghost btn-circle avatar flex-none"
      onClick={handleLogout}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 3H11C11.7956 3 12.5587 3.31607 13.1213 3.87868C13.6839 4.44129 14 5.20435 14 6V10H13V6C13 5.46957 12.7893 4.96086 12.4142 4.58579C12.0391 4.21071 11.5304 4 11 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H11C11.5304 21 12.0391 20.7893 12.4142 20.4142C12.7893 20.0391 13 19.5304 13 19V15H14V19C14 19.7956 13.6839 20.5587 13.1213 21.1213C12.5587 21.6839 11.7956 22 11 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V6C2 5.20435 2.31607 4.44129 2.87868 3.87868C3.44129 3.31607 4.20435 3 5 3ZM8 12H19.25L16 8.75L16.66 8L21.16 12.5L16.66 17L16 16.25L19.25 13H8V12Z"
          fill="var(--secondary-color)"
        />
      </svg>
    </div>
  );
}
function ReportIcon() {
  return (
    <div className="flex ">
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17V15M12 17V13M15 17V11M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H12.586C12.8512 3.00006 13.1055 3.10545 13.293 3.293L18.707 8.707C18.8946 8.89449 18.9999 9.1488 19 9.414V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z"
            stroke="var(--secondary-color)"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function PurchaseIcon() {
  return (
    <div className="flex ">
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_15_35)">
            <rect width="24" height="24" fill="white" />
            <path
              d="M5.33331 6H19.8672C20.4687 6 20.9341 6.52718 20.8595 7.12403L20.1095 13.124C20.0469 13.6245 19.6215 14 19.1172 14H16.5555H9.44442H7.99998"
              stroke="#000000"
              stroke-linejoin="round"
            />
            <path
              d="M2 4H4.23362C4.68578 4 5.08169 4.30341 5.19924 4.74003L8.30076 16.26C8.41831 16.6966 8.81422 17 9.26638 17H19"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle
              cx="10"
              cy="20"
              r="1"
              stroke="#000000"
              stroke-linejoin="round"
            />
            <circle
              cx="17.5"
              cy="20"
              r="1"
              stroke="#000000"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_15_35">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
