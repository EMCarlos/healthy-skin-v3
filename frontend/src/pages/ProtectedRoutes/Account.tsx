import { OrdersTab } from "@/components/account/OrdersTab";
import { ProductsTab } from "@/components/account/ProductsTab";
import { ProfileTab } from "@/components/account/ProfileTab";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetProductList from "@/hooks/useGetProductList";
import useGeneralStore from "@/store";
import { User, Shield, Settings, Clock, Package, Users } from "lucide-react";
import { UsersTab } from "@/components/account/UsersTab";
import { useUsersList } from "@/hooks";

// Mock orders data
const orders = [
  {
    id: "ORD-2025419-001",
    date: "2025-04-19",
    total: 23.59,
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-2025419-002",
    date: "2025-04-19",
    total: 18.6,
    status: "Processing",
    paymentStatus: "Pending",
  },
];

// Mock all orders for admin
const allOrders = [
  ...orders,
  {
    id: "ORD-2025419-003",
    date: "2025-04-19",
    total: 45.99,
    status: "Pending",
    paymentStatus: "Paid",
    customer: "Jane Smith",
  },
  {
    id: "ORD-2025419-004",
    date: "2025-04-19",
    total: 32.8,
    status: "Delivered",
    paymentStatus: "Paid",
    customer: "Mike Johnson",
  },
];

// Mock users data for admin
const users = [
  {
    id: "USER-001",
    name: "John Doe",
    email: "john.doe@email.com",
    role: "Customer",
    status: "Active",
    joinDate: "2025-01-15",
    lastLogin: "2025-04-19",
  },
  {
    id: "USER-002",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    role: "Customer",
    status: "Active",
    joinDate: "2025-02-10",
    lastLogin: "2025-04-18",
  },
  {
    id: "USER-003",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    role: "Customer",
    status: "Inactive",
    joinDate: "2025-01-05",
    lastLogin: "2025-03-15",
  },
  {
    id: "USER-004",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    role: "Admin",
    status: "Active",
    joinDate: "2024-12-01",
    lastLogin: "2025-04-19",
  },
];

const Account = () => {
  const { userLogged } = useGeneralStore();
  const { isLoading, products = [] } = useGetProductList();
  const { usersList, isLoadingUsersList } = useUsersList();
  const isAdmin = userLogged?.isAdmin;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-5 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>

        <Tabs
          defaultValue="profile"
          className="space-y-4 overflow-hidden w-full"
        >
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Clock className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            {/* //TODO */}
            {/* <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger> */}

            {/* Only show admin tab if user is admin */}
            {isAdmin && (
              <>
                <TabsTrigger value="admin">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </TabsTrigger>
                <TabsTrigger value="products">
                  <Package className="h-4 w-4 mr-2" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab orders={orders} />
          </TabsContent>

          {/* //TODO: Next */}
          {/* <TabsContent value="settings">
            <SettingsTab />
          </TabsContent> */}

          {isAdmin && (
            <>
              <TabsContent value="admin">
                <OrdersTab
                  orders={allOrders}
                  showCustomer={true}
                />
              </TabsContent>

              <TabsContent value="products">
                <ProductsTab products={products} />
              </TabsContent>

              <TabsContent value="users">
                <UsersTab users={usersList ?? []} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
