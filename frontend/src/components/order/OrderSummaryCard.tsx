import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type OrderSummaryProps = {
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
};

export const OrderSummaryCard = ({ items, subtotal, shippingCost }: OrderSummaryProps) => {
  const total = subtotal + shippingCost;

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <Separator className="" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
