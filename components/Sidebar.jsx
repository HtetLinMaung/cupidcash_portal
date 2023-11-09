// components/Sidebar.js

export default function Sidebar() {
  return (
    <div
      className="h-screen fixed top-0 left-0 w-16 m-0
                      flex flex-col
                      bg-gray-900 text-white shadow-lg"
    >
      <SidebarIcon icon={<HomeIcon />} text="Home" />
      {/* <SidebarIcon icon={<GraphIcon />} /> */}
      {/* ... other icons */}
    </div>
  );
}

function SidebarIcon({ icon, text = "tooltip 💡" }) {
  return (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
}

function HomeIcon() {
  // This should be an SVG or any other icon component
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

function GraphIcon() {
  // This should be an SVG or any other icon component
  return <div>Graph</div>;
}
