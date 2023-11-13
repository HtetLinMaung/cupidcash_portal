// components/Sidebar.js
"use client";
export default function Sidebar() {
  return (
    <div
      className="h-screen fixed top-0 left-0 w-16 m-0
                      flex flex-col
                      bg-gray-900 text-white shadow-lg"
    >
      <SidebarIcon icon={<HomeIcon />} text="Home" href="/dashboard" />
      <SidebarIcon
        icon={<OrderIcon />}
        text="Payment"
        href="/dashboard/payment"
      />
      <SidebarIcon
        icon={<CategoryIcon />}
        text="Category"
        href="/dashboard/category"
      />
      <SidebarIcon icon={<CategoryIcon />} text="User" href="/dashboard/user" />
      <SidebarIcon icon={<CategoryIcon />} text="Shop" href="/dashboard/shop" />
      <SidebarIcon icon={<CategoryIcon />} text="Item" href="/dashboard/item" />

      {/* ... other icons */}
    </div>
  );
}

function SidebarIcon({ icon, text = "tooltip 💡", href = "/" }) {
  return (
    <a href={href} onClick={() => console.log(`click ${text}`)}>
      <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </div>
    </a>
  );
}

function HomeIcon() {
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
          d="M5 12H3L12 3L21 12H19M5 12V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 21V15C9 14.4696 9.21071 13.9609 9.58579 13.5858C9.96086 13.2107 10.4696 13 11 13H13C13.5304 13 14.0391 13.2107 14.4142 13.5858C14.7893 13.9609 15 14.4696 15 15V21"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function OrderIcon() {
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
          d="M17.371 19.827L20.211 17.031L19.585 16.404L17.371 18.587L16.415 17.612L15.788 18.244L17.371 19.827ZM6.77 8.73H17.232V7.73H6.769L6.77 8.73ZM18 22.115C16.886 22.115 15.9407 21.727 15.164 20.951C14.3873 20.175 13.9993 19.2297 14 18.115C14 17.0017 14.388 16.0567 15.164 15.28C15.94 14.5033 16.8853 14.115 18 14.115C19.114 14.115 20.0593 14.5033 20.836 15.28C21.6127 16.0567 22.0007 17.0017 22 18.115C22 19.2297 21.612 20.175 20.836 20.951C20.0587 21.727 19.1133 22.115 18 22.115ZM4 20.77V5.615C4 5.16833 4.15733 4.78733 4.472 4.472C4.78667 4.15733 5.16767 4 5.615 4H18.385C18.8317 4 19.2127 4.15733 19.528 4.472C19.8427 4.78667 20 5.16767 20 5.615V11.56C19.8373 11.5 19.6757 11.4487 19.515 11.406C19.355 11.3633 19.1833 11.33 19 11.306V5.616C19 5.462 18.936 5.32067 18.808 5.192C18.6793 5.064 18.5383 5 18.385 5H5.615C5.46167 5 5.32067 5.064 5.192 5.192C5.064 5.32067 5 5.46167 5 5.615V19.05H11.344C11.3893 19.3233 11.448 19.5907 11.52 19.852C11.5927 20.1133 11.6937 20.3627 11.823 20.6L11.788 20.635L10.654 19.808L9.308 20.769L7.962 19.808L6.615 20.769L5.269 19.808L4 20.769V20.77ZM6.77 16.27H11.479C11.5163 16.0867 11.5623 15.915 11.617 15.755C11.6723 15.595 11.7367 15.4333 11.81 15.27H6.77V16.27ZM6.77 12.501H14.08C14.4067 12.243 14.7567 12.028 15.13 11.856C15.5033 11.6833 15.9023 11.565 16.327 11.501H6.769L6.77 12.501Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

function CategoryIcon() {
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
          d="M7.88499 10.2299L12 3.46289L16.115 10.2319H7.88499V10.2299ZM17.5 21.2299C16.4553 21.2299 15.572 20.8699 14.85 20.1499C14.13 19.4279 13.77 18.5446 13.77 17.4999C13.77 16.4552 14.13 15.5722 14.85 14.8509C15.572 14.1296 16.4553 13.7689 17.5 13.7689C18.5447 13.7689 19.428 14.1296 20.15 14.8509C20.87 15.5722 21.23 16.4552 21.23 17.4999C21.23 18.5446 20.8697 19.4279 20.149 20.1499C19.4277 20.8699 18.5447 21.2299 17.5 21.2299ZM3.76999 20.7299V14.2699H10.23V20.7299H3.76999ZM17.5 20.2299C18.264 20.2299 18.91 19.9662 19.438 19.4389C19.9667 18.9109 20.231 18.2649 20.231 17.5009C20.231 16.7362 19.967 16.0896 19.439 15.5609C18.911 15.0329 18.265 14.7689 17.501 14.7689C16.7363 14.7689 16.0897 15.0329 15.561 15.5609C15.033 16.0889 14.769 16.7349 14.769 17.4989C14.769 18.2636 15.033 18.9102 15.561 19.4389C16.089 19.9669 16.735 20.2309 17.499 20.2309L17.5 20.2299ZM4.76999 19.7299H9.22999V15.2699H4.76999V19.7299ZM9.62699 9.22989H14.373L12 5.42789L9.62699 9.22989Z"
          fill="white"
        />
      </svg>
    </div>
  );
}
