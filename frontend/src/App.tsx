import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Loader2 } from "lucide-react";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

// Lazy load components
const Landing = lazy(() => import("./pages/PublicRoutes/Landing"));
const Products = lazy(() => import("./pages/PublicRoutes/Products"));
const Favorites = lazy(() => import("./pages/PublicRoutes/Favorites"));
const About = lazy(() => import("./pages/PublicRoutes/About"));
const NotFound = lazy(() => import("./pages/PublicRoutes/NotFound"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-purple" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    {import.meta.env.DEV && (
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-left"
      />
    )}
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
              path="/favorites"
              element={<Favorites />}
            />
            <Route
              path="/about"
              element={<About />}
            />
            {/* <Route
                path="/contact"
                element={<Contact />}
              /> */}
            {/* <Route
                path="/signin"
                element={<SignIn />}
              />
              <Route
                path="/signup"
                element={<SignUp />}
              />
              */}
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
