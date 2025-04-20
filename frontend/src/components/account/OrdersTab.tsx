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
import { Order } from "@/types";
import { Link } from "react-router-dom";

type OrdersTabProps = {
  orders?: Order[];
  showCustomer?: boolean;
};

export const OrdersTab = ({ orders, showCustomer = false }: OrdersTabProps) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>{showCustomer ? "All Orders" : "Order History"}</CardTitle>
        <CardDescription>
          {showCustomer ? "Manage and track all customer orders" : "View and track your orders"}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {!orders?.length ? (
          <div className="text-center py-4 text-muted-foreground">
         No orders available.
          </div> ): (

    
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              {showCustomer && <TableHead>Customer</TableHead>}
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                {showCustomer && <TableCell>{order.customer}</TableCell>}
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>
                  <Link to={`/order-confirmation?id=${order.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
              )}
      </CardContent>
    </Card>
  );
};
