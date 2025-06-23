import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useOrderDelivery, useOrderDetails, useOrderPayment } from "@/hooks";
import useGeneralStore from "@/store";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const BANK_NAME = import.meta.env.VITE_BANK_NAME;
const BANK_ACCOUNT_NUMBER = import.meta.env.VITE_BANK_ACCOUNT_NUMBER;
const BANK_ACCOUNT_NAME = import.meta.env.VITE_BANK_ACCOUNT_NAME;

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id") ?? "");
  const { userLogged } = useGeneralStore();
  const isAdmin = userLogged?.isAdmin;
  const { orderDetails, isLoadingOrderDetails, orderDetailsError } = useOrderDetails(id);
  const { payOrder, isProcessingPayment } = useOrderPayment();
  const { deliverOrder, isUpdatingDelivery } = useOrderDelivery();
  const orderName =
    orderDetails?._id && orderDetails?.createdAt
      ? `ORD-00${orderDetails._id}${orderDetails.createdAt.slice(
          2,
          4
        )}${orderDetails.createdAt.slice(5, 7)}${orderDetails.createdAt.slice(8, 10)}`
      : "Unknown Order";
  if (!id || isLoadingOrderDetails) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple" />
      </div>
    );
  }

  if (orderDetailsError) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find an order with that ID. Please check your link or contact support.
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

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
                <p className="font-medium">{orderName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                <p>{orderDetails?.createdAt?.split("T")?.[0] ?? "Unknown Date"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                <p>{orderDetails?.paymentMethod}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <p
                  className={
                    orderDetails?.isDelivered
                      ? "text-green-600 font-medium"
                      : orderDetails?.isPaid
                      ? "text-green-200 font-medium"
                      : "text-amber-600 font-medium"
                  }
                >
                  {orderDetails?.isDelivered
                    ? "Delivered"
                    : orderDetails?.isPaid
                    ? "Paid"
                    : "Processing"}
                </p>
              </div>
            </div>

            {orderDetails?.paymentMethod === "bank" && (
              <div className="mt-6 bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Bank Transfer Details</h3>
                <p className="text-sm mb-2">
                  Please use the following details to complete your payment:
                </p>
                <div className="text-sm">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="font-medium">Bank:</span>
                    <span>{BANK_NAME}</span>
                    <span className="font-medium">Account Name:</span>
                    <span>{BANK_ACCOUNT_NAME}</span>
                    <span className="font-medium">Account Number:</span>
                    <span>{BANK_ACCOUNT_NUMBER}</span>
                    <span className="font-medium">Reference:</span>
                    <span>{orderName}</span>
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
              {orderDetails?.orderItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground"> × {item.qty}</span>
                  </div>
                  <div>${(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}

              <Separator className="" />

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>
                  $
                  {(
                    Number(orderDetails?.totalPrice ?? 0) - Number(orderDetails?.shippingPrice ?? 0)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>${orderDetails?.shippingPrice}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${orderDetails?.totalPrice}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
            <p className="text-sm">
              {`${orderDetails?.user?.username} ${orderDetails?.user?.lastname}`}
              <br />
              {`${orderDetails?.user.email}`}
              <br />
              {orderDetails?.shippingAddress?.phone}
              <br />
              {orderDetails?.shippingAddress?.address}
              <br />
              {orderDetails?.shippingAddress?.city} {orderDetails?.shippingAddress?.postalCode}
              <br />
              {orderDetails?.shippingAddress?.country ?? "Aruba"}
            </p>
          </CardContent>
        </Card>

        {/* Gift Message */}
        {!!orderDetails?.shippingAddress?.message && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Gift Message</h2>
              <p className="text-sm">
                {`From: ${orderDetails?.giftMessage?.from ?? "Anonymous"}`}
                <br />
                {`To: ${orderDetails?.giftMessage?.to ?? "Unknown"}`}
                <br />
                {`Message: ${orderDetails?.giftMessage?.message ?? "No message"}`}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Admin section with delivery status */}
        {isAdmin && (
          <Card className="mb-6 border-dashed border-amber-500 border-[1px]">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Admin Controls</h2>

              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium">Payment Status</h3>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => payOrder(orderDetails?._id ?? "")}
                      disabled={isProcessingPayment || orderDetails?.isPaid}
                    >
                      Mark as Paid
                    </Button>
                    {/* //TODO: Future */}
                    {/* <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Send Payment Reminder
                    </Button> */}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-medium">Delivery Status</h3>
                  <div className="flex gap-3">
                    {/* //TODO: Future */}
                    {/* <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Mark as Shipped
                    </Button> */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => deliverOrder(orderDetails?._id ?? "")}
                      disabled={isUpdatingDelivery || orderDetails?.isDelivered}
                    >
                      Mark as Delivered
                    </Button>
                  </div>
                </div>

                {/* //TODO: Future */}
                {/* <div className="flex flex-col gap-2">
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
                </div> */}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center mt-8">
          <Link to={isAdmin ? "/account?tab=admin" : "/"}>
            <Button>{isAdmin ? "Manage Orders" : "Continue Shopping"}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
