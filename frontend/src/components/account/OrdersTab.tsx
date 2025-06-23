import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "@/types";
import { Link } from "react-router-dom";

type OrdersTabProps = {
  orders?: Order[];
  showCustomer?: boolean;
  loading?: boolean;
};

export const OrdersTab = ({ orders, showCustomer = false, loading = false }: OrdersTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{showCustomer ? "All Orders" : "Order History"}</CardTitle>
        <CardDescription>
          {showCustomer ? "Manage and track all customer orders" : "View and track your orders"}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {loading ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                {showCustomer && <TableHead>Customer</TableHead>}
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Shipping</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  {showCustomer && (
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                  )}
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-14" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-20 rounded" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : !orders?.length ? (
          <div className="text-center py-4 text-muted-foreground">No orders available.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                {showCustomer && <TableHead>Customer</TableHead>}
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Shipping</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => {
                const orderName =
                  order?._id && order?.createdAt
                    ? `ORD-00${order._id}${order.createdAt.slice(2, 4)}${order.createdAt.slice(
                        5,
                        7
                      )}${order.createdAt.slice(8, 10)}`
                    : "Unknown Order";

                return (
                  <TableRow key={order._id}>
                    <TableCell>{orderName}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString("es-ES")}</TableCell>
                    {showCustomer && <TableCell>{order?.user?.email}</TableCell>}
                    <TableCell>${order.totalPrice}</TableCell>
                    <TableCell>{order.isPaid ? "Paid" : "Unpaid"}</TableCell>
                    <TableCell>{order.isDelivered ? "Delivered" : "Pending"}</TableCell>
                    <TableCell>
                      <Link to={`/order-confirmation?id=${order._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
