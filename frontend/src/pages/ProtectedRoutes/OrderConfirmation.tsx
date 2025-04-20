import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  // Mock data for order details
  //TODO: Replace with actual data from the backend or state management
  const orderNumber = "ORD-2025419-001";
  const orderDate = "April 19, 2025";
  const paymentMethod = "Bank Transfer";
  const items = [
    { name: "Niacinamide 10% + Zinc 1%", quantity: 2, price: 5.9 },
    { name: "Hyaluronic Acid 2% + B5", quantity: 1, price: 6.8 },
  ];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Thank You For Your Order!</h1>
          <p className="text-muted-foreground">
            Your order has been received and is now being processed. Your order details are shown
            below for your reference.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Order Information</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Order Number</h3>
                <p className="font-medium">{orderNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                <p>{orderDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                <p>{paymentMethod}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <p className="text-amber-600 font-medium">Processing</p>
              </div>
            </div>

            {paymentMethod === "Bank Transfer" && (
              <div className="mt-6 bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Bank Transfer Details</h3>
                <p className="text-sm mb-2">
                  Please use the following details to complete your payment:
                </p>
                <div className="text-sm">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="font-medium">Bank:</span>
                    <span>Bank of Example</span>
                    <span className="font-medium">Account Name:</span>
                    <span>The Ordinary Shop</span>
                    <span className="font-medium">Account Number:</span>
                    <span>12345678</span>
                    <span className="font-medium">Reference:</span>
                    <span>{orderNumber}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground"> × {item.quantity}</span>
                  </div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}

              <Separator className="" />

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
            <p className="text-sm">
              John Doe
              <br />
              123 Main Street
              <br />
              Apt 4B
              <br />
              New York, NY 10001
              <br />
              United States
            </p>
          </CardContent>
        </Card>

        {/* Admin section with delivery status */}
        <Card className="mb-6 border-dashed border-amber-500">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Admin Controls</h2>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Delivery Status</h3>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Mark as Shipped
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Mark as Delivered
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Payment Status</h3>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Mark as Paid
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Send Payment Reminder
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Order Actions</h3>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Print Invoice
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-destructive hover:bg-destructive/10"
                  >
                    Cancel Order
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
