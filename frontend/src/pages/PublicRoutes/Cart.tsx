import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useGeneralStore from "@/store/useGeneralStore";
import { TrashIcon } from "lucide-react";
import { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useGeneralStore();

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.price ?? 0) * (item.quantity ?? 0), 0),
    [cartItems]
  );
  const shipping = useMemo(() => (cartItems.length > 0 ? 4.99 : 0), [cartItems]);
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  return (
    <Fragment>
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto mt-10 p-4 md:p-8 bg-background">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          {cartItems.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card
                    key={item._id}
                    className="overflow-hidden"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-contain rounded border-purple shadow-md hover:shadow-lg transition-shadow duration-300"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold flex-1">{item.name}</h3>$
                          {(Number(item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}
                          <div className="text-sm text-muted-foreground mt-1">
                            ${Number(item.price ?? 0).toFixed(2)} each
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border rounded">
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, Math.max(1, (item.quantity ?? 1) - 1))
                                }
                                disabled={(item.quantity ?? 1) <= 1}
                                className="px-3 py-1 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                -
                              </button>
                              <span className="px-3 py-1">{item.quantity}</span>
                              <button
                                disabled={
                                  !item.countInStock ||
                                  (item.quantity ?? 0) >= (item.countInStock ?? 0)
                                }
                                onClick={() => updateQuantity(item._id, (item.quantity ?? 0) + 1)}
                                className="px-3 py-1 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                +
                              </button>
                            </div>
                            <button
                              className="text-destructive flex items-center gap-1 text-sm font-medium hover:underline"
                              onClick={() => removeFromCart(item._id)}
                            >
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
                    <div className="bg-muted px-2 py-1 rounded text-xs hover:bg-purple-light transition-colors cursor-pointer">
                      Bank Transfer
                    </div>
                    <div className="bg-muted px-2 py-1 rounded text-xs hover:bg-purple-light transition-colors cursor-pointer">
                      Cash on Delivery
                    </div>
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
      <Footer />
    </Fragment>
  );
};

export default Cart;
