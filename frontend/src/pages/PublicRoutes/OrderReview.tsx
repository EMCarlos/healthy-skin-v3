import { GiftMessageCard } from "@/components/order/GiftMessageCard";
import { OrderSummaryCard } from "@/components/order/OrderSummaryCard";
import { PaymentMethodCard } from "@/components/order/PaymentMethodCard";
import { ShippingDetailsCard } from "@/components/order/ShippingDetailsCard";
import { Button } from "@/components/ui/button";
import useGeneralStore from "@/store";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderReview = () => {
  const navigate = useNavigate();
  const cartItems = useGeneralStore((state) => state.cartItems);
  const checkoutForm = useGeneralStore((state) => state.checkoutForm);

  const orderItems = useMemo(() => {
    return cartItems.map((item) => {
      return {
        name: item.name ?? "",
        price: Number(item.price ?? 0),
        quantity: item.quantity ?? 0,
      };
    });
  }, [cartItems]);

  // Mock order details
  const orderDetails = useMemo(() => {
    if (!checkoutForm) {
      return {
        items: orderItems,
        shippingDetails: {},
        isGift: false,
        subtotal: orderItems.reduce(
          (total, item) => total + Number(item.price) * (item.quantity ?? 0),
          0
        ),
        shippingCost: 4.99,
      };
    }

    return {
      items: orderItems,
      shippingDetails: {
        name: `${checkoutForm.firstname} ${checkoutForm.lastname}`,
        email: checkoutForm.email,
        address: checkoutForm.address,
        city: checkoutForm.city,
        postalCode: checkoutForm.postalCode,
        country: checkoutForm.country,
        phone: checkoutForm.phone,
      },
      paymentMethod: checkoutForm.paymentMethod,
      isGift: checkoutForm.isGift,
      giftMessage: {
        from: checkoutForm.giftFrom,
        to: checkoutForm.giftTo,
        message: checkoutForm.giftMessage,
      },
      subtotal: orderItems.reduce(
        (total, item) => total + Number(item.price) * (item.quantity ?? 0),
        0
      ),
      shippingCost: 4.99,
    };
  }, [orderItems, checkoutForm]);

  const handleConfirmOrder = () => {
    navigate("/order-confirmation");
  };

  if (!cartItems.length && !checkoutForm?.phone) navigate("/cart");

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Review Your Order</h1>
        <p className="text-muted-foreground mb-8">
          Please review your order details before confirming.
        </p>

        <div className="space-y-6">
          <OrderSummaryCard
            items={orderDetails.items}
            subtotal={orderDetails.subtotal}
            shippingCost={orderDetails.shippingCost}
          />

          <ShippingDetailsCard shipping={orderDetails.shippingDetails} />

          <PaymentMethodCard paymentMethod={orderDetails.paymentMethod} />

          {orderDetails.isGift && <GiftMessageCard giftMessage={orderDetails.giftMessage} />}

          <div className="flex justify-between items-center">
            <Link to="/checkout">
              <Button variant="outline">Back to Checkout</Button>
            </Link>
            <Button onClick={handleConfirmOrder}>Confirm Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
