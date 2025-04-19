import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Mock cart data for demonstration
const cartItems = [
  {
    id: 1,
    name: "Niacinamide 10% + Zinc 1%",
    price: 5.9,
    image:
      "https://images.unsplash.com/photo-1620916566482-c2d20e1664b1?auto=format&fit=crop&q=80&w=150",
    quantity: 2,
  },
  {
    id: 2,
    name: "Hyaluronic Acid 2% + B5",
    price: 6.8,
    image:
      "https://images.unsplash.com/photo-1608639103025-c3be0e01d15f?auto=format&fit=crop&q=80&w=150",
    quantity: 1,
  },
];

const Cart = () => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background ">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          ${item.price.toFixed(2)} each
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border rounded">
                            <button className="px-3 py-1 hover:bg-muted">-</button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button className="px-3 py-1 hover:bg-muted">+</button>
                          </div>
                          <button className="text-destructive flex items-center gap-1 text-sm">
                            <TrashIcon size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <Card>
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

                  <Link to="/checkout">
                    <Button className="w-full mt-6">Proceed to Checkout</Button>
                  </Link>
                </CardContent>
              </Card>

              <div className="text-sm text-muted-foreground">
                <p className="mb-2">We accept:</p>
                <div className="flex gap-2">
                  <div className="bg-muted px-2 py-1 rounded text-xs">Bank Transfer</div>
                  <div className="bg-muted px-2 py-1 rounded text-xs">Cash on Delivery</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link to="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
