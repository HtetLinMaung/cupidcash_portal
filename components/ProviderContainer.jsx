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
import OrderProvider from "@/providers/OrderProvider";
export default function ProviderContainer({ children }) {
  return (
    <AppProvider>
      <NavProvider>
        <NotificationProvider>
          <UserProvider>
            <OrderProvider>
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
            </OrderProvider>
          </UserProvider>
        </NotificationProvider>
      </NavProvider>
    </AppProvider>
  );
}
