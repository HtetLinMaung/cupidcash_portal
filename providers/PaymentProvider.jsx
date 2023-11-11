import useData from "@/hooks/use-data";
import { createContext } from "react";

const initState = {
  orders: [],
  order: {
    waiter_name: "",
    table_number: "",
    created_at: new Date().toISOString(),
    items: [],
  },
  subTotal: 0,
  search: "",
  selectedOrder: 0,
};

export const paymentContext = createContext(null);

export default function PaymentProvider({ children }) {
  return (
    <paymentContext.Provider value={useData(initState)}>
      {children}
    </paymentContext.Provider>
  );
}
