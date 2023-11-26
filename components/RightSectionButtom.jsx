import { server_domain } from "@/constants";
import React from "react";
import money from "mm-money";

export default function RightSectionButtom({ item, index }) {
  return (
    <div className="flex-grow overflow-y-auto pl-8">
      <div key={index} className="mb-4 flex">
        <img
          src={server_domain + item.image_url}
          alt={item.item_name}
          className="h-20 w-20 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        />
        <div className="px-4 flex flex-col justify-between leading-normal">
          <h5 className="text-md font-bold">{item.item_name}</h5>
          <p className="text-sm">Qty: {item.quantity}</p>
          {item.special_instructions && (
            <p className="text-sm">Notes: {item.special_instructions}</p>
          )}
          <p className="text-md">{money.format(item.price)} Ks</p>
        </div>
      </div>
    </div>
  );
}
