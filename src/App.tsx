import { useState, useEffect } from "react";
import { Sidebar } from "./components/Layout/Sidebar";
import { Topbar } from "./components/Layout/Topbar";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { POSScreen } from "./components/POS/POSScreen";
import { KitchenDisplay } from "./components/KDS/KitchenDisplay";
import { OrdersManagement } from "./components/Orders/OrdersManagement";
import { MenuManagement } from "./components/Menu/MenuManagement";
import { InventoryManagement } from "./components/Inventory/InventoryManagement";
import { StaffManagement } from "./components/Staff/StaffManagement";
import { Analytics } from "./components/Reports/Analytics";
import { CustomerCRM } from "./components/Customers/CustomerCRM";
import { TenantManagement } from "./components/Admin/TenantManagement";
import { Settings } from "./components/Settings/Settings";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { CartProvider } from "./components/Cart/CartContext";
import { CartIndicator } from "./components/Cart/CartIndicator";
import { BackgroundDecoration } from "./components/Layout/BackgroundDecoration";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "new-order":
        setActiveView("pos");
        toast.success("Opening POS...");
        break;
      case "open-drawer":
        toast.info("Cash drawer opened");
        break;
      default:
        break;
    }
  };

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "pos":
        return <POSScreen />;
      case "kds":
        return <KitchenDisplay />;
      case "orders":
        return <OrdersManagement />;
      case "menu":
        return <MenuManagement />;
      case "inventory":
        return <InventoryManagement />;
      case "staff":
        return <StaffManagement />;
      case "reports":
        return <Analytics />;
      case "customers":
        return <CustomerCRM />;
      case "admin":
        return <TenantManagement />;
      case "settings":
        return <Settings />;
      case "help":
        return (
          <div className="space-y-6">
            <div>
              <h1>Help & Support</h1>
              <p className="text-muted-foreground">Get help with RestaurantOS</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-border hover:shadow-lg transition-shadow cursor-pointer">
                <h3>📚 Documentation</h3>
                <p className="text-muted-foreground mt-2">
                  Browse our comprehensive guides and tutorials
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border hover:shadow-lg transition-shadow cursor-pointer">
                <h3>💬 Live Chat</h3>
                <p className="text-muted-foreground mt-2">
                  Chat with our support team in real-time
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border hover:shadow-lg transition-shadow cursor-pointer">
                <h3>📧 Email Support</h3>
                <p className="text-muted-foreground mt-2">
                  Send us an email at support@restaurantos.com
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border hover:shadow-lg transition-shadow cursor-pointer">
                <h3>📞 Phone Support</h3>
                <p className="text-muted-foreground mt-2">
                  Call us at +1 (800) 123-4567
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <CartProvider>
      <motion.div 
        className="min-h-screen relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackgroundDecoration />
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <Topbar onQuickAction={handleQuickAction} onNavigateToPOS={() => setActiveView("pos")} />
        
        <main className="ml-64 mt-16 p-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Toaster position="top-right" />
        {activeView !== "pos" && <CartIndicator onNavigateToPOS={() => setActiveView("pos")} />}
      </motion.div>
    </CartProvider>
  );
}
