// components/Sidebar.js
"use client";

import { navContext } from "@/providers/navProvider";
import { useContext } from "react";

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
        icon={<OrderIcon onClick={() => handleSidebarIconClick("Payment")} />}
        text="Payment"
        href="/dashboard/payment"
      />
      <SidebarIcon icon={<SetupIcon />} text="Setup" href="/dashboard/setup" />
      <div className="mt-auto">
        <SidebarIcon icon={<Profile />} text="Profile" />
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
          fill=" var(--primary-color)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H3L12 3L21 12H19M5 12V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V12"
            stroke=" var(--primary-color)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 21V15C9 14.4696 9.21071 13.9609 9.58579 13.5858C9.96086 13.2107 10.4696 13 11 13H13C13.5304 13 14.0391 13.2107 14.4142 13.5858C14.7893 13.9609 15 14.4696 15 15V21"
            stroke=" var(--primary-color)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
          fill="rgba(1, 0, 1)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.371 19.827L20.211 17.031L19.585 16.404L17.371 18.587L16.415 17.612L15.788 18.244L17.371 19.827ZM6.77 8.73H17.232V7.73H6.769L6.77 8.73ZM18 22.115C16.886 22.115 15.9407 21.727 15.164 20.951C14.3873 20.175 13.9993 19.2297 14 18.115C14 17.0017 14.388 16.0567 15.164 15.28C15.94 14.5033 16.8853 14.115 18 14.115C19.114 14.115 20.0593 14.5033 20.836 15.28C21.6127 16.0567 22.0007 17.0017 22 18.115C22 19.2297 21.612 20.175 20.836 20.951C20.0587 21.727 19.1133 22.115 18 22.115ZM4 20.77V5.615C4 5.16833 4.15733 4.78733 4.472 4.472C4.78667 4.15733 5.16767 4 5.615 4H18.385C18.8317 4 19.2127 4.15733 19.528 4.472C19.8427 4.78667 20 5.16767 20 5.615V11.56C19.8373 11.5 19.6757 11.4487 19.515 11.406C19.355 11.3633 19.1833 11.33 19 11.306V5.616C19 5.462 18.936 5.32067 18.808 5.192C18.6793 5.064 18.5383 5 18.385 5H5.615C5.46167 5 5.32067 5.064 5.192 5.192C5.064 5.32067 5 5.46167 5 5.615V19.05H11.344C11.3893 19.3233 11.448 19.5907 11.52 19.852C11.5927 20.1133 11.6937 20.3627 11.823 20.6L11.788 20.635L10.654 19.808L9.308 20.769L7.962 19.808L6.615 20.769L5.269 19.808L4 20.769V20.77ZM6.77 16.27H11.479C11.5163 16.0867 11.5623 15.915 11.617 15.755C11.6723 15.595 11.7367 15.4333 11.81 15.27H6.77V16.27ZM6.77 12.501H14.08C14.4067 12.243 14.7567 12.028 15.13 11.856C15.5033 11.6833 15.9023 11.565 16.327 11.501H6.769L6.77 12.501Z"
            fill="rgba(1, 0, 1)"
          />
        </svg>
      </div>
    </div>
  );
}

function SetupIcon() {
  return (
    <div className="flex ">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <rect x="0" y="0" width="20" height="20" fill="none" stroke="none" />
          <path
            fill="rgba(1, 0, 1)"
            d="M11.078 0c.294 0 .557.183.656.457l.706 1.957c.253.063.47.126.654.192c.201.072.46.181.78.33l1.644-.87a.702.702 0 0 1 .832.131l1.446 1.495c.192.199.246.49.138.744l-.771 1.807c.128.235.23.436.308.604c.084.183.188.435.312.76l1.797.77c.27.115.437.385.419.674l-.132 2.075a.69.69 0 0 1-.46.605l-1.702.605c-.049.235-.1.436-.154.606a8.79 8.79 0 0 1-.298.774l.855 1.89a.683.683 0 0 1-.168.793l-1.626 1.452a.703.703 0 0 1-.796.096l-1.676-.888a7.23 7.23 0 0 1-.81.367l-.732.274l-.65 1.8a.696.696 0 0 1-.64.457L9.11 20a.697.697 0 0 1-.669-.447l-.766-2.027a14.625 14.625 0 0 1-.776-.29a9.987 9.987 0 0 1-.618-.293l-1.9.812a.702.702 0 0 1-.755-.133L2.22 16.303a.683.683 0 0 1-.155-.783l.817-1.78a9.517 9.517 0 0 1-.302-.644a14.395 14.395 0 0 1-.3-.811L.49 11.74a.69.69 0 0 1-.49-.683l.07-1.921a.688.688 0 0 1 .392-.594L2.34 7.64c.087-.319.163-.567.23-.748a8.99 8.99 0 0 1 .314-.712L2.07 4.46a.683.683 0 0 1 .15-.79l1.404-1.326a.702.702 0 0 1 .75-.138l1.898.784c.21-.14.4-.253.572-.344c.205-.109.479-.223.824-.346l.66-1.841A.696.696 0 0 1 8.984 0h2.094Zm-.49 1.377H9.475L8.87 3.071a.693.693 0 0 1-.434.423c-.436.145-.751.27-.935.367c-.195.103-.444.26-.74.47a.703.703 0 0 1-.673.074l-1.83-.755l-.713.674l.743 1.57a.68.68 0 0 1-.006.597c-.2.401-.335.697-.403.879a10.31 10.31 0 0 0-.27.922a.69.69 0 0 1-.37.45l-1.79.859l-.036.98l1.62.492c.215.065.385.23.456.442c.16.48.288.834.38 1.056a10 10 0 0 0 .404.827a.68.68 0 0 1 .019.606l-.751 1.638l.711.668l1.782-.762a.703.703 0 0 1 .603.024c.365.192.637.325.809.398c.175.073.51.195.996.361a.693.693 0 0 1 .424.41l.708 1.871l.926-.02l.597-1.654a.692.692 0 0 1 .409-.413l1.037-.388c.262-.097.58-.25.951-.46a.703.703 0 0 1 .674-.008l1.577.835l.887-.791L15.856 14a.681.681 0 0 1-.001-.56c.182-.407.305-.714.367-.91c.061-.192.124-.469.185-.825a.69.69 0 0 1 .451-.533l1.648-.585l.072-1.14l-1.62-.694a.692.692 0 0 1-.377-.394a15.337 15.337 0 0 0-.378-.944a11.01 11.01 0 0 0-.42-.794a.682.682 0 0 1-.035-.606l.725-1.7l-.764-.79l-1.488.788a.703.703 0 0 1-.633.013a11.296 11.296 0 0 0-.968-.426a7.185 7.185 0 0 0-.857-.23a.694.694 0 0 1-.508-.441l-.668-1.853Zm-.564 4.264c2.435 0 4.41 1.953 4.41 4.361c0 2.408-1.975 4.36-4.41 4.36c-2.436 0-4.41-1.952-4.41-4.36c0-2.408 1.974-4.36 4.41-4.36Zm0 1.378c-1.667 0-3.018 1.335-3.018 2.983c0 1.648 1.351 2.984 3.018 2.984c1.666 0 3.017-1.336 3.017-2.984s-1.35-2.983-3.017-2.983Z"
          />
        </svg>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="flex ">
      <div className="dropdown dropdown-end flex-none">
        <div
          tabindex="0"
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
      </div>
    </div>
  );
}
