import { Card, CardContent } from "@/components/ui/card";

type GiftMessage = {
  from?: string;
  to?: string;
  message?: string;
};

type GiftMessageCardProps = {
  giftMessage?: GiftMessage;
};

export const GiftMessageCard = ({ giftMessage }: GiftMessageCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Gift Message</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">From:</span> {giftMessage?.from || "Anonymous"}
          </p>
          <p>
            <span className="font-medium">To:</span> {giftMessage?.to || "Recipient"}
          </p>

          <p>
            <span className="font-medium">Message:</span>{" "}
            {giftMessage?.message || "No message provided"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
