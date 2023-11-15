import CategoryProvider from "@/providers/CategoryProvider";
import PaymentProvider from "@/providers/PaymentProvider";
import AppProvider from "@/providers/AppProvider";
import UserProvider from "@/providers/UserProvider";
import TableProvider from "@/providers/TableProvider";

export default function ProviderContainer({ children }) {
  return (
    <AppProvider>
      <UserProvider>
        <CategoryProvider>
          <PaymentProvider>
            <TableProvider>
              {children}
            </TableProvider>
          </PaymentProvider>
        </CategoryProvider>
      </UserProvider>
    </AppProvider>
  );
}
