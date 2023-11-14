import CategoryProvider from "@/providers/CategoryProvider";
import PaymentProvider from "@/providers/PaymentProvider";
import AppProvider from "@/providers/AppProvider";
import UserProvider from "@/providers/UserProvider";
import ItemProvider from "@/providers/ItemProvider";

export default function ProviderContainer({ children }) {
  return (
    <AppProvider>
      <UserProvider>
        <CategoryProvider>
          <PaymentProvider>
            <ItemProvider>{children}</ItemProvider>
          </PaymentProvider>
        </CategoryProvider>
      </UserProvider>
    </AppProvider>
  );
}
