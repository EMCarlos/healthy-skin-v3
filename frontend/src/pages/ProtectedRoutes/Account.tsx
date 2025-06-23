import { OrdersTab } from "@/components/account/OrdersTab";
import { ProductsTab } from "@/components/account/ProductsTab";
import { ProfileTab } from "@/components/account/ProfileTab";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProductList } from "@/hooks";
import useGeneralStore from "@/store";
import { User, Shield, Settings, Clock, Package, Users } from "lucide-react";
import { UsersTab } from "@/components/account/UsersTab";
import { useMyOrders, useOrderHistory, useUsersList } from "@/hooks";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const Account = () => {
  const { userLogged } = useGeneralStore();
  const [searchParams] = useSearchParams();
  const tab = useMemo(() => searchParams.get("tab") || "profile", [searchParams]);

  const { isLoading, products = [] } = useGetProductList();
  const { usersList, isLoadingUsersList } = useUsersList();
  const { orderHistory, isLoadingOrders } = useOrderHistory();
  const { myOrders, isLoadingMyOrders } = useMyOrders();
  const isAdmin = userLogged?.isAdmin;

  const onTabClick = (value: string) => {
    searchParams.set("tab", value);
    window.history.replaceState({}, "", `?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-5 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>

        <Tabs
          // className="space-y-4 overflow-hidden w-full"
          defaultValue={tab}
        >
          <TabsList>
            <TabsTrigger
              value="profile"
              onClick={() => onTabClick("profile")}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              onClick={() => onTabClick("orders")}
            >
              <Clock className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            {/* //TODO */}
            {/* <TabsTrigger value="settings" }>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger> */}
            {isAdmin && (
              <>
                <TabsTrigger
                  value="admin"
                  onClick={() => onTabClick("admin")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  onClick={() => onTabClick("products")}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Products
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  onClick={() => onTabClick("users")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent
            value="profile"
            // hidden={tab !== "profile"}
          >
            <ProfileTab />
          </TabsContent>

          <TabsContent
            value="orders"
            // hidden={tab !== "orders"}
          >
            <OrdersTab
              orders={myOrders}
              loading={isLoadingMyOrders}
            />
          </TabsContent>

          {/* //TODO: Next */}
          {/* <TabsContent value="settings"  hidden={tab !== "settings"}> 
            <SettingsTab />
          </TabsContent> */}

          {isAdmin && (
            <>
              <TabsContent
                value="admin"
                // hidden={tab !== "admin"}
              >
                <OrdersTab
                  orders={orderHistory}
                  showCustomer={true}
                  loading={isLoadingOrders}
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
