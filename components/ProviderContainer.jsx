import CategoryProvider from "@/providers/CategoryProvider";
import PaymentProvider from "@/providers/PaymentProvider";
import AppProvider from "@/providers/AppProvider";
import UserProvider from "@/providers/UserProvider";
import ItemProvider from "@/providers/ItemProvider";
import ShopProvider from "@/providers/ShopProvider";
import TableProvider from "@/providers/TableProvider";
import NotificationProvider from "@/providers/NotificationProvider";
import DashboardProvider from "@/providers/DashboardProvider";
import NavProvider from "@/providers/navProvider";
export default function ProviderContainer({ children }) {
  return (
    <AppProvider>
      <NavProvider>
        <NotificationProvider>
          <UserProvider>
            <CategoryProvider>
              <PaymentProvider>
                <DashboardProvider>
                  <ShopProvider>
                    <TableProvider>
                      <ItemProvider>{children}</ItemProvider>
                    </TableProvider>
                  </ShopProvider>
                </DashboardProvider>
              </PaymentProvider>
            </CategoryProvider>
          </UserProvider>
        </NotificationProvider>
      </NavProvider>
    </AppProvider>
  );
}
