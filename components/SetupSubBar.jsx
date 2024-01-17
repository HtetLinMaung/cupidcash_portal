import { navContext } from "@/providers/navProvider";
import { useContext } from "react";

export default function SetupSubBar() {
  const { setHref } = useContext(navContext);
  const handleSidebarIconClick = (text) => {
    setHref(text);
  };
  return (
    <div
      style={{ paddingTop: "0.5rem " }}
      className="w-full 
                    flex flex-col
                     text-white 
                      h-full "
    >
      {/* Render four cards with different icons and menu texts */}
      <SetupCard icon={<UserIcon />} text="User" href="/dashboard/user" />
      <SetupCard icon={<ShopIcon />} text="Shop" href="/dashboard/shop" />
      <SetupCard
        icon={<CategoryIcon />}
        text="Category"
        href="/dashboard/category"
      />
      <SetupCard icon={<ProductIcon />} text="Item" href="/dashboard/item" />
      <SetupCard icon={<TableIcon />} text="Table" href="/dashboard/table" />
    </div>
  );
}

function SetupCard({ icon, text = "tooltip 💡", href = "/" }) {
  return (
    <a href={href}>
      <div className="sidebar-icon group w-full ">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </div>
    </a>
  );
}

function CategoryIcon() {
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
            d="M17 10C18.6569 10 20 8.65685 20 7C20 5.34315 18.6569 4 17 4C15.3431 4 14 5.34315 14 7C14 8.65685 15.3431 10 17 10Z"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 20C8.65685 20 10 18.6569 10 17C10 15.3431 8.65685 14 7 14C5.34315 14 4 15.3431 4 17C4 18.6569 5.34315 20 7 20Z"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 14H20V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H15C14.7348 20 14.4804 19.8946 14.2929 19.7071C14.1054 19.5196 14 19.2652 14 19V14ZM4 4H10V9C10 9.26522 9.89464 9.51957 9.70711 9.70711C9.51957 9.89464 9.26522 10 9 10H5C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V4Z"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <div className="flex ">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 256 256"
        >
          <rect
            x="0"
            y="0"
            width="256"
            height="256"
            fill="none"
            stroke="none"
          />
          <path
            fill="black"
            d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56Z"
            style={{ width: "2.5rem" }}
          />
        </svg>
      </div>
    </div>
  );
}

function ShopIcon() {
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
            d="M20.25 2.75H3.75C3.48478 2.75 3.23043 2.85536 3.04289 3.04289C2.85536 3.23043 2.75 3.48478 2.75 3.75V20.25C2.75 20.5152 2.85536 20.7696 3.04289 20.9571C3.23043 21.1446 3.48478 21.25 3.75 21.25H20.25C20.5152 21.25 20.7696 21.1446 20.9571 20.9571C21.1446 20.7696 21.25 20.5152 21.25 20.25V3.75C21.25 3.48478 21.1446 3.23043 20.9571 3.04289C20.7696 2.85536 20.5152 2.75 20.25 2.75Z"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.598 11.1305C13.005 11.043 12.4655 11.3585 12.4655 12.2315V12.438C12.4654 12.6151 12.5003 12.7905 12.568 12.9541C12.6358 13.1178 12.7351 13.2664 12.8603 13.3917C12.9856 13.5169 13.1342 13.6162 13.2979 13.684C13.4615 13.7517 13.6369 13.7866 13.814 13.7865C13.9911 13.7865 14.1664 13.7516 14.33 13.6838C14.4936 13.6161 14.6422 13.5167 14.7674 13.3915C14.8925 13.2663 14.9918 13.1176 15.0595 12.954C15.1273 12.7904 15.1621 12.6151 15.162 12.438V11.562C15.1621 11.3849 15.1273 11.2096 15.0595 11.046C14.9918 10.8824 14.8925 10.7337 14.7674 10.6085C14.6422 10.4833 14.4936 10.3839 14.33 10.3162C14.1664 10.2484 13.9911 10.2135 13.814 10.2135C13.173 10.2135 12.9135 10.3495 12.556 10.7385M8.61451 8.39349V13.7865M8.61451 11.562C8.61444 11.3849 8.64926 11.2096 8.71697 11.046C8.78469 10.8824 8.88397 10.7337 9.00915 10.6085C9.13433 10.4833 9.28296 10.3839 9.44654 10.3162C9.61011 10.2484 9.78544 10.2135 9.96251 10.2135C10.1396 10.2135 10.3149 10.2484 10.4785 10.3162C10.6421 10.3839 10.7907 10.4833 10.9159 10.6085C11.041 10.7337 11.1403 10.8824 11.208 11.046C11.2758 11.2096 11.3106 11.3849 11.3105 11.562V13.7865M5.16801 13.485C5.41401 13.6915 5.68001 13.7865 6.27701 13.7865H6.57951C7.07151 13.7865 7.47051 13.3865 7.47051 12.893C7.47051 12.4 7.07151 12 6.57951 12H5.97451C5.48201 12 5.08301 11.6 5.08301 11.107C5.08301 10.6135 5.48201 10.2135 5.97451 10.2135H6.27701C6.87351 10.2135 7.13951 10.3085 7.38551 10.515M16.22 12.438C16.2199 12.6151 16.2548 12.7905 16.3225 12.9541C16.3903 13.1178 16.4896 13.2664 16.6148 13.3917C16.7401 13.5169 16.8887 13.6162 17.0524 13.684C17.216 13.7517 17.3914 13.7866 17.5685 13.7865C17.7456 13.7866 17.921 13.7517 18.0846 13.684C18.2483 13.6162 18.397 13.5169 18.5222 13.3917C18.6474 13.2664 18.7467 13.1178 18.8145 12.9541C18.8822 12.7905 18.9171 12.6151 18.917 12.438V11.562C18.9171 11.3849 18.8822 11.2095 18.8145 11.0459C18.7467 10.8822 18.6474 10.7335 18.5222 10.6083C18.397 10.4831 18.2483 10.3838 18.0846 10.316C17.921 10.2483 17.7456 10.2134 17.5685 10.2135C17.3914 10.2135 17.2161 10.2484 17.0525 10.3162C16.889 10.3839 16.7403 10.4833 16.6152 10.6085C16.49 10.7337 16.3907 10.8824 16.323 11.046C16.2553 11.2096 16.2204 11.3849 16.2205 11.562M16.2205 10.2135V15.6065"
            stroke="black"
            stroke-width="0.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function ProductIcon() {
  return (
    <div className="flex ">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 2048 2048"
        >
          <rect
            x="0"
            y="0"
            width="2048"
            height="2048"
            fill="none"
            stroke="none"
          />
          <path
            fill="black"
            d="m1344 2l704 352v785l-128-64V497l-512 256v258l-128 64V753L768 497v227l-128-64V354L1344 2zm0 640l177-89l-463-265l-211 106l497 248zm315-157l182-91l-497-249l-149 75l464 265zm-507 654l-128 64v-1l-384 192v455l384-193v144l-448 224L0 1735v-676l576-288l576 288v80zm-640 710v-455l-384-192v454l384 193zm64-566l369-184l-369-185l-369 185l369 184zm576-1l448-224l448 224v527l-448 224l-448-224v-527zm384 576v-305l-256-128v305l256 128zm384-128v-305l-256 128v305l256-128zm-320-288l241-121l-241-120l-241 120l241 121z"
            style={{ width: "2.5rem" }}
          />
        </svg>
      </div>
    </div>
  );
}

function TableIcon() {
  return (
    <div className="flex ">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
        >
          <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
          <path
            fill="black"
            d="m6 20l1.5-3.75q.225-.575.725-.913T9.35 15H11v-4.025Q7.175 10.85 4.587 9.85T2 7.5q0-1.45 2.925-2.475T12 4q4.175 0 7.088 1.025T22 7.5q0 1.35-2.588 2.35T13 10.975V15h1.65q.6 0 1.113.338t.737.912L18 20h-2l-1.2-3H9.2L8 20H6Zm6-11q2.425 0 4.575-.425t3.15-1.075q-1-.65-3.15-1.075T12 6q-2.425 0-4.575.425T4.275 7.5q1 .65 3.15 1.075T12 9Zm0-1.5Z"
            style={{ width: "2.5rem" }}
          />
        </svg>
      </div>
    </div>
  );
}
