import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./layout/protected";
import { QueryProvider } from "./providers/QueryProvider";

const queryClient = new QueryClient();

// Lazy load components
const Landing = lazy(() => import("./pages/PublicRoutes/Landing"));
const Products = lazy(() => import("./pages/PublicRoutes/Products"));
const ProductDetail = lazy(() => import("./pages/PublicRoutes/ProductDetail"));
const Favorites = lazy(() => import("./pages/PublicRoutes/Favorites"));
const About = lazy(() => import("./pages/PublicRoutes/About"));
const NotFound = lazy(() => import("./pages/PublicRoutes/NotFound"));
const SignIn = lazy(() => import("./pages/PublicRoutes/SignIn"));
const SignUp = lazy(() => import("./pages/PublicRoutes/SignUp"));
const Cart = lazy(() => import("./pages/PublicRoutes/Cart"));
const Checkout = lazy(() => import("./pages/PublicRoutes/Checkout"));
const OrderReview = lazy(() => import("./pages/PublicRoutes/OrderReview"));
const OrderConfirmation = lazy(() => import("./pages/ProtectedRoutes/OrderConfirmation"));
const Account = lazy(() => import("./pages/ProtectedRoutes/Account"));
const FAQ = lazy(() => import("./pages/PublicRoutes/FAQ"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-purple" />
  </div>
);

const App = () => (
  <QueryProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route
              path="/"
              element={<Landing />}
            />
            <Route
              path="/products"
              element={<Products />}
            />
            <Route
              path="/product/:productId"
              element={<ProductDetail />}
            />

            <Route
              path="/favorites"
              element={<Favorites />}
            />
            <Route
              path="/about"
              element={<About />}
            />
            <Route
              path="/faq"
              element={<FAQ />}
            />
            <Route
              path="/cart"
              element={<Cart />}
            />
            <Route
              path="/checkout"
              element={<Checkout />}
            />
            <Route
              path="/order-review"
              element={<OrderReview />}
            />
            <Route
              path="/order-confirmation"
              element={
                <Protected>
                  <OrderConfirmation />
                </Protected>
              }
            />
            <Route
              path="/account"
              element={
                <Protected>
                  <Account />
                </Protected>
              }
            />
            {/* <Route
                path="/contact"
                element={<Contact />}
              /> */}
            <Route
              path="/signin"
              element={<SignIn />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryProvider>
);

export default App;
