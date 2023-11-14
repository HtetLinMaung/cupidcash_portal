import CategoryProvider from "@/providers/CategoryProvider";
import PaymentProvider from "@/providers/PaymentProvider";
import LoadingBar from "./LoadingBar";
import AppProvider from "@/providers/AppProvider";

export default function ProviderContainer({ children }) {
  return (
    <AppProvider>
      <CategoryProvider>
        <PaymentProvider>{children}</PaymentProvider>
      </CategoryProvider>
    </AppProvider>
  );
}
