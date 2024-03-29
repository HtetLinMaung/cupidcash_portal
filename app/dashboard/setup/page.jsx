import React from "react";
import Breadcrumb from "@/components/Breadcrumb";

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Setup" },
];
const Setup = () => {
  return (
    <div className="py-5 pr-4">
      <div className="m-8 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Render four cards with different icons and menu descriptions */}
        <SetupCard
          icon={<UserIcon />}
          description="User"
          href="/dashboard/user"
        />
        <SetupCard
          icon={<ShopIcon />}
          description="Shop"
          href="/dashboard/shop"
        />
        <SetupCard
          icon={<CategoryIcon />}
          description="Category"
          href="/dashboard/category"
        />
        <SetupCard
          icon={<ProductIcon />}
          description="Item"
          href="/dashboard/item"
        />
        <SetupCard
          icon={<TableIcon />}
          description="Table"
          href="/dashboard/table"
        />
        <SetupCard
          icon={<TableIcon />}
          description="Ingredient"
          href="/dashboard/ingredient"
        />
      </div>
    </div>
  );
};

export default Setup;

function SetupCard({ icon, description = "tooltip 💡", href = "/" }) {
  return (
    <a href={href}>
      <div
        className="flex pt-5 bg-white rounded-lg overflow-hidden shadow-md w-full  items-center p-4 justify-start"
        style={{ gap: "0.75rem" }}
      >
        {/* Icon */}
        <div className="group ">{icon}</div>

        {/* Description */}
        <div className="pb-4 pt-3 ">
          <h2 className="font-bold text-xl m-2">{description}</h2>
        </div>
      </div>
    </a>
  );
}

function CategoryIcon() {
  return (
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
          d="m12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5s4.5-2.01 4.5-4.5s-2.01-4.5-4.5-4.5zm0 7a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"
          style={{ width: "2.5rem" }}
        />
      </svg>
    </div>
  );
}

function UserIcon() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 256 256"
      >
        <rect x="0" y="0" width="256" height="256" fill="none" stroke="none" />
        <path
          fill="black"
          d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56Z"
          style={{ width: "2.5rem" }}
        />
      </svg>
    </div>
  );
}

function ShopIcon() {
  return (
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
          fillRule="evenodd"
          d="M7.307 1.25c-.801 0-1.35 0-1.84.133a3.75 3.75 0 0 0-2.36 1.936c-.227.452-.334.991-.491 1.777l-.62 3.098a3.79 3.79 0 0 0 .754 3.117v2.745c0 1.838 0 3.294.153 4.433c.158 1.172.49 2.121 1.238 2.87c.748.748 1.697 1.08 2.87 1.238c1.139.153 2.595.153 4.432.153h1.113c1.838 0 3.294 0 4.433-.153c1.172-.158 2.121-.49 2.87-1.238c.748-.749 1.08-1.698 1.238-2.87c.153-1.14.153-2.595.153-4.433v-2.744a3.79 3.79 0 0 0 .753-3.118l-.62-3.098c-.156-.786-.264-1.325-.49-1.777a3.75 3.75 0 0 0-2.361-1.936c-.489-.133-1.038-.133-1.84-.133H7.308Zm10.961 11.5a3.8 3.8 0 0 0 1.482-.298V14c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008c-.423.423-1.003.677-2.01.812a15.6 15.6 0 0 1-1.538.114v-2.756c0-.44 0-.82-.028-1.13c-.03-.33-.096-.656-.274-.963a2.25 2.25 0 0 0-.823-.824c-.307-.177-.633-.243-.963-.273c-.31-.028-.69-.028-1.13-.028h-.065c-.44 0-.819 0-1.13.028c-.33.03-.655.096-.962.273a2.25 2.25 0 0 0-.824.824c-.177.307-.243.633-.273.962c-.028.312-.028.691-.028 1.13v2.757a15.6 15.6 0 0 1-1.54-.114c-1.005-.135-1.585-.389-2.008-.812c-.424-.423-.677-1.003-.812-2.009c-.139-1.027-.14-2.382-.14-4.289v-1.548a3.807 3.807 0 0 0 4.588-1.306A3.908 3.908 0 0 0 12 12.75a3.908 3.908 0 0 0 3.162-1.604a3.807 3.807 0 0 0 3.106 1.604Zm-8.018 8.498c.388.002.804.002 1.25.002h1c.446 0 .861 0 1.25-.002V18.5c0-.481-.001-.792-.022-1.027c-.02-.225-.055-.307-.079-.348a.75.75 0 0 0-.274-.274c-.041-.024-.123-.058-.348-.079A12.831 12.831 0 0 0 12 16.75c-.481 0-.792 0-1.027.022c-.226.02-.307.055-.348.079a.75.75 0 0 0-.275.274c-.023.04-.058.123-.078.348c-.021.235-.022.546-.022 1.027v2.748ZM8.67 2.75H7.418c-.954 0-1.285.007-1.553.08a2.25 2.25 0 0 0-1.416 1.161c-.125.249-.196.571-.383 1.507l-.598 2.99a2.31 2.31 0 1 0 4.562.683l.069-.686l.004-.042l.569-5.693Zm.921 5.875l.588-5.875h3.642l.584 5.842a2.417 2.417 0 1 1-4.814.033Zm8.544-5.795c-.268-.073-.599-.08-1.553-.08h-1.254l.643 6.42a2.309 2.309 0 1 0 4.561-.682l-.597-2.99c-.188-.936-.259-1.258-.383-1.507a2.25 2.25 0 0 0-1.417-1.161Z"
          clip-rule="evenodd"
          style={{ width: "2.5rem" }}
        />
      </svg>
    </div>
  );
}

function ProductIcon() {
  return (
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
  );
}

function TableIcon() {
  return (
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
  );
}
