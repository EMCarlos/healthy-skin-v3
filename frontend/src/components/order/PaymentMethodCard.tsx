import { Card, CardContent } from "@/components/ui/card";

type PaymentMethodCardProps = {
  paymentMethod?: string;
};

export const PaymentMethodCard = ({ paymentMethod }: PaymentMethodCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <p>{paymentMethod || "No payment method selected."}</p>
      </CardContent>
    </Card>
  );
};
