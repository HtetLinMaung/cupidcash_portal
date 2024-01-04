"use client";

import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { orderContext } from "@/providers/OrderProvider";
import { server_domain } from "@/constants";
import money from "mm-money";
import { appContext } from "@/providers/AppProvider";
export default function RightOrderCard() {
  let table_no;
  const { setLoading } = useContext(appContext);
  const { selectItems, setSelectItems } = useContext(orderContext);
  const [slideAnimation, setSlideAnimation] = useState(
    "slideOut 0.5s ease-in-out forwards"
  );

  useEffect(() => {
    if (selectItems.length > 0) {
      setSlideAnimation("slideIn 0.3s ease-in-out forwards");
    } else {
      setSlideAnimation("slideOut 0.5s ease-in-out forwards");
    }
  }, [selectItems]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updateItems = selectItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setSelectItems(updateItems);
  };
  const handleRemoveItem = (itemId) => {
    const updateItems = selectItems.filter((item) => item.id !== itemId);
    setSelectItems(updateItems);
  };

  const calculateTotalPrice = () => {
    return selectItems.reduce(
      (total, selectedItem) =>
        total + selectedItem.quantity * selectedItem.price,
      0
    );
  };

  const addOrders = async (data) => {
    try {
      setLoading(true);
    } catch (err) {
      setLoading(false);
      handleError(err, router);
    }
  };
  return (
    <div
      className=" w-96  text-black py-8 fixed top-0 bottom-0 right-0"
      style={{
        width: selectItems == 0 ? 0 : "24rem",
        maxWidth: selectItems == 0 ? 0 : "24rem",
        padding: selectItems == 0 ? 0 : "0.75rem 0",
        animation: slideAnimation,
        transition: "all 0.3s",
        marginTop: "4.2rem",
        backgroundColor: "var(--secondary-color)",
      }}
    >
      <div style={{ width: 0 }}>
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
      <div
        className="flex-grow overflow-y-auto pl-8 custom-scrollbar "
        style={{ height: "75%", borderBottom: "2px solid #c4c4c4" }}
      >
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      selectedItem.id,
                      Math.max(1, selectedItem.quantity - 1)
                    )
                  }
                >
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                      fill="var(--buttom-color)"
                    />
                  </svg>
                </button>
                <p className="text-sm">
                  Qty:{" "}
                  <span className="zoom-animation">
                    {selectedItem.quantity}
                  </span>
                </p>
                <button
                  onClick={() =>
                    handleQuantityChange(
                      selectedItem.id,
                      selectedItem.quantity + 1
                    )
                  }
                >
                  <svg
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                    id="meteor-icon-kit__solid-plus-circle"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.5 10.5H7C6.17157 10.5 5.5 11.1716 5.5 12C5.5 12.8284 6.17157 13.5 7 13.5H10.5V17C10.5 17.8284 11.1716 18.5 12 18.5C12.8284 18.5 13.5 17.8284 13.5 17V13.5H17C17.8284 13.5 18.5 12.8284 18.5 12C18.5 11.1716 17.8284 10.5 17 10.5H13.5V7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7V10.5ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
                      fill="var(--buttom-color)"
                    />
                  </svg>
                </button>

                <div
                  style={{
                    border: "1px solid #c4c4c4",
                    borderRadius: "16px",
                    width: "3.5rem",
                    padding: "4px",
                    position: "absolute",
                    right: "1rem",
                  }}
                  className="text-red-500 hover:text-red-700 cursor-pointer "
                  onClick={() => handleRemoveItem(selectedItem.id)}
                >
                  <span className="w-full">Remove</span>
                </div>
              </div>
              <p className="font-bold text-md">
                {money.format(selectedItem.price)} Ks
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="float-right gap-4 flex p-4">
        <div className="font-bold text-lg"> Total Price:</div>
        <div className="font-bold">
          <span className="text-lg">
            {money.format(calculateTotalPrice().toFixed(2).split(".")[0])}
          </span>
          <span className="text-sm">{`.${
            calculateTotalPrice().toFixed(2).split(".")[1]
          }`}</span>
        </div>
        <div className=" text-lg font-bold">Ks</div>
      </div>
      <div className="flex w-full px-4">
        <div style={{ width: "75px", padding: "0.3rem 0rem" }}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Table No.
          </label>
        </div>
        <div style={{ width: "calc(100% - 75px);" }}>
          <input
            className="w-full p-2  rounded-lg border transition focus:border-white focus:outline-none focus:ring-2 focus:ring-c4c4c4"
            id="name"
            type="text"
            name="Table No."
            value={table_no}
            required
          />
        </div>
      </div>
    </div>
  );
}
