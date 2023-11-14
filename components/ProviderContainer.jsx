import CategoryProvider from "@/providers/CategoryProvider";
import PaymentProvider from "@/providers/PaymentProvider";
import AppProvider from "@/providers/AppProvider";
import UserProvider from "@/providers/UserProvider";

export default function ProviderContainer({ children }) {
  return (
    <AppProvider>
      <UserProvider>
        <CategoryProvider>
          <PaymentProvider>{children}</PaymentProvider>
        </CategoryProvider>
      </UserProvider>
    </AppProvider>
  );
}
