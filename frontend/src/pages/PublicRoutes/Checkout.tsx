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
import useGeneralStore from "@/store/useGeneralStore";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [isGift, setIsGift] = useState(false);

  // Zustand store for saving checkout form
  const checkoutForm = useGeneralStore((state) => state.checkoutForm);
  const setCheckoutForm = useGeneralStore((state) => state.setCheckoutForm);
  const cartItems = useGeneralStore((state) => state.cartItems);
  const {
    firstname,
    lastname,
    email,
    phone,
    address,
    city,
    postalCode,
    country,
    giftFrom,
    giftTo,
    giftMessage,
    paymentMethod,
    isGift: storeIsGift,
  } = checkoutForm || {};

  // Local state for form fields
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "usa",
    giftFrom: "",
    giftTo: "",
    giftMessage: "",
    paymentMethod: "bank",
  });

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price ?? 0) * (item.quantity ?? 1),
      0
    );
  }, [cartItems]);
  const shipping = 4.99;
  const total = useMemo(() => subtotal + shipping, [shipping, subtotal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleCountryChange = (value: string) => {
    setForm((prev) => ({ ...prev, country: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutForm({
      ...form,
      isGift,
      paymentMethod: paymentMethod ?? "bank",
    });
    navigate("/order-confirmation");
  };

  useEffect(() => {
    if (firstname) {
      setForm((prev) => ({
        ...prev,
        firstname: firstname ?? prev.firstname,
        lastname: lastname ?? prev.lastname,
        email: email ?? prev.email,
        phone: phone ?? prev.phone,
        address: address ?? prev.address,
        city: city ?? prev.city,
        postalCode: postalCode ?? prev.postalCode,
        country: country ?? prev.country,
        giftFrom: giftFrom ?? prev.giftFrom,
        giftTo: giftTo ?? prev.giftTo,
        giftMessage: giftMessage ?? prev.giftMessage,
      }));
    }
    setIsGift(!!storeIsGift);
  }, [
    firstname,
    lastname,
    email,
    phone,
    address,
    city,
    postalCode,
    country,
    giftFrom,
    giftTo,
    giftMessage,
    storeIsGift,
  ]);

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Add items to your cart to proceed with checkout.
          </p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

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
                      <Label htmlFor="firstname">First Name</Label>
                      <Input
                        id="firstname"
                        placeholder="First name"
                        required
                        value={form.firstname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Last Name</Label>
                      <Input
                        id="lastname"
                        placeholder="Last name"
                        required
                        value={form.lastname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email address"
                        required
                        value={form.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="Phone number"
                        required
                        value={form.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Street address"
                        required
                        value={form.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        required
                        value={form.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        placeholder="Postal code"
                        required
                        value={form.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        defaultValue={"usa"}
                        value={form.country}
                        onValueChange={handleCountryChange}
                      >
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem
                            value="aw"
                            country="aw"
                            className="flex items-center gap-x-1"
                          >
                            Aruba
                          </SelectItem>
                          <SelectItem
                            value="usa"
                            country="us"
                            className="flex items-center gap-x-1"
                          >
                            United States
                          </SelectItem>
                          <SelectItem
                            value="can"
                            country="ca"
                            className="flex items-center gap-x-1"
                          >
                            Canada
                          </SelectItem>
                          <SelectItem
                            value="uk"
                            country="gb"
                            className="flex items-center gap-x-1"
                          >
                            United Kingdom
                          </SelectItem>
                          <SelectItem
                            value="au"
                            country="au"
                            className="flex items-center gap-x-1"
                          >
                            Australia
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment method section */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-lg mb-4">Payment Method</h2>

                  <RadioGroup
                    defaultValue="bank"
                    value={form.paymentMethod}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, paymentMethod: value }))
                    }
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="bank"
                        id="bank"
                        checked={form.paymentMethod === "bank"}
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
                        checked={form.paymentMethod === "cash"}
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

              {/* Gift section */}
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
                          value={form.giftFrom}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="giftTo">To</Label>
                        <Input
                          id="giftTo"
                          placeholder="Recipient's name"
                          value={form.giftTo}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="giftMessage">Gift Message</Label>
                        <Textarea
                          id="giftMessage"
                          placeholder="Add your personal message here"
                          className="min-h-[100px]"
                          value={form.giftMessage}
                          onChange={handleInputChange}
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

          {/* Order Summary Card */}
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
                    {cartItems.map((item) => (
                      <li
                        key={item._id}
                        className="flex justify-between"
                      >
                        <span>
                          {item.name}{" "}
                          <span className="text-peach-dark">({Number(item.quantity ?? 0)})</span>
                        </span>
                        <span>${Number(item.price ?? 0) * (item.quantity ?? 1)}</span>
                      </li>
                    ))}
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
