import useData from "@/hooks/use-data";
import { createContext } from "react";

const initState = {
  users: [],
  user: {
    name: "",
    username: "",
    password: "",
    role_id: "",
    role_name: "",
    shop_id: "",
    shop_name: "",
    created_at: new Date().toISOString(),
    items: [],
  },
  subTotal: 0,
  search: "",
  selectedOrder: 0,
};

export const paymentContext = createContext(initState);

export default function UserProvider({ children }) {
  return (
    <paymentContext.Provider value={useData(initState)}>
      {children}
    </paymentContext.Provider>
  );
}
