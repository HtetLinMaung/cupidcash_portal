import useData from "@/hooks/use-data";
import { createContext } from "react";

const initState = {
  shops: [],
};

export const categoryContext = createContext(null);

export default function CategoryProvider({ children }) {
  return (
    <categoryContext.Provider value={useData(initState)}>
      {children}
    </categoryContext.Provider>
  );
}
