import CategoryProvider from "@/providers/CategoryProvider";
import PaymentProvider from "@/providers/PaymentProvider";
import AppProvider from "@/providers/AppProvider";
import UserProvider from "@/providers/UserProvider";
import ItemProvider from "@/providers/ItemProvider";
import ShopProvider from "@/providers/ShopProvider";

export default function ProviderContainer({ children }) {
  return (
    <AppProvider>
      <UserProvider>
        <CategoryProvider>
          <PaymentProvider>
            <ShopProvider>
              <ItemProvider>{children}</ItemProvider>
            </ShopProvider>
          </PaymentProvider>
        </CategoryProvider>
      </UserProvider>
    </AppProvider>
  );
}
