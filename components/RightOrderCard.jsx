"use client";

import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { orderContext } from "@/providers/OrderProvider";
import { server_domain } from "@/constants";
import money from "mm-money";
export default function RightOrderCard({ items, children }) {
  const { selectItems, setSelectItems } = useContext(orderContext);
  const [slideAnimation, setSlideAnimation] = useState(
    "slideOut 0.5s ease-in-out forwards"
  );

  useEffect(() => {
    if (selectItems != []) {
      setSlideAnimation("slideIn 0.3s ease-in-out forwards");
    } else {
      setSlideAnimation("slideOut 0.5s ease-in-out forwards");
    }
  }, [selectItems]);
  return (
    <div
      className=" w-96  text-black py-8 fixed top-0 bottom-0 right-0"
      style={{
        width: selectItems == 0 ? 0 : "24rem",
        maxWidth: selectItems == 0 ? 0 : "24rem",
        padding: selectItems == 0 ? 0 : "2rem 0",
        animation: slideAnimation,
        transition: "all 0.3s",
        marginTop: "4.2rem",
        backgroundColor: "var(--secondary-color)",
      }}
    >
      <div className="flex">
        <div
          className="absolute left-[-3%] pt-1%  p-1  shadow-md skeleton close-sidebar"
          onClick={() => {
            setSelectItems([]);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="mb-8 px-8"></div>
      </div>
      <div className="flex-grow overflow-y-auto pl-8 custom-scrollbar">
        {selectItems.map((selectedItem) => (
          <div key={selectedItem.id} className="mb-4 flex">
            <div className="h-20 w-20">
              <img
                src={server_domain + selectedItem.image_url}
                alt={selectedItem.name}
                className="w-full h-full flex-none bg-cover rounded-full text-center overflow-hidden"
              />
            </div>
            <div className="px-4 py-2 flex flex-col leading-normal">
              <h5 className="text-md font-bold">{selectedItem.name}</h5>
              <p className="text-sm">Qty: {selectedItem.quantity}</p>
              <p className="text-md">{money.format(selectedItem.price)} Ks</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
