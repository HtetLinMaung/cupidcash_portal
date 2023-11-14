import CategoryProvider from "@/providers/CategoryProvider";
import PaymentProvider from "@/providers/PaymentProvider";
import AppProvider from "@/providers/AppProvider";
import UserProvider from "@/providers/UserProvider";
import ShopProvider from "@/providers/ShopProvider";
export default function ProviderContainer({ children }) {
  return (
    <AppProvider>
      <ShopProvider>
        <UserProvider>
          <CategoryProvider>
            <PaymentProvider>{children}</PaymentProvider>
          </CategoryProvider>
        </UserProvider>
      </ShopProvider>
    </AppProvider>
  );
}
