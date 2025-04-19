import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [isGift, setIsGift] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");

  // Mock data for order summary
  const subtotal = 18.6;
  const shipping = 4.99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-8">Complete your order by providing your details</p>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email address"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="Phone number"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Street address"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        placeholder="Postal code"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="usa">
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="can">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-lg mb-4">Payment Method</h2>

                  <RadioGroup
                    defaultValue="bank"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="bank"
                        id="bank"
                      />
                      <Label
                        htmlFor="bank"
                        className="flex-1"
                      >
                        <div className="font-medium">Bank Transfer</div>
                        <div className="text-sm text-muted-foreground">
                          Pay via bank transfer. You'll receive details after placing your order.
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="cash"
                        id="cash"
                      />
                      <Label
                        htmlFor="cash"
                        className="flex-1"
                      >
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-muted-foreground">
                          Pay with cash when your order is delivered.
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="gift"
                      checked={isGift}
                      onCheckedChange={(checked) => setIsGift(checked === true)}
                    />
                    <Label
                      htmlFor="gift"
                      className="font-medium"
                    >
                      This is a gift
                    </Label>
                  </div>

                  {isGift && (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="giftFrom">From</Label>
                        <Input
                          id="giftFrom"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="giftTo">To</Label>
                        <Input
                          id="giftTo"
                          placeholder="Recipient's name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="giftMessage">Gift Message</Label>
                        <Textarea
                          id="giftMessage"
                          placeholder="Add your personal message here"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-between items-center mt-6">
                <Link to="/cart">
                  <Button variant="outline">Back to Cart</Button>
                </Link>
                <Button type="submit">Review Order</Button>
              </div>
            </form>
          </div>

          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 text-sm text-muted-foreground">
                  <p>Your order includes:</p>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    <li>Niacinamide 10% + Zinc 1% (2)</li>
                    <li>Hyaluronic Acid 2% + B5 (1)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
