import { Card, CardContent } from "@/components/ui/card";

type ShippingDetails = {
  name?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
};

type ShippingDetailsCardProps = {
  shipping: ShippingDetails;
};

export const ShippingDetailsCard = ({ shipping }: ShippingDetailsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <div className="space-y-2">
          <p>{shipping.name || "Name not provided"}</p>
          <p>{shipping.address || "Address not provided"}</p>
          <p>{shipping.city || "City not provided"}</p>
          <p>{shipping.postalCode || "Postal code not provided"}</p>
          <p>{shipping.country || "Aruba"}</p>
          <p>Phone: {shipping.phone || "Phone number not provided"}</p>
        </div>
      </CardContent>
    </Card>
  );
};
