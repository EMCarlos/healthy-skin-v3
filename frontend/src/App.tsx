import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Landing from "./pages/PublicRoutes/Landing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {import.meta.env.DEV && (
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-left"
      />
    )}
    <FavoritesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Landing />}
            />
            {/* <Route
              path="/products"
              element={<Products />}
            />
            <Route
              path="/favorites"
              element={<Favorites />}
            /> */}
            {/* <Route
              path="/about"
              element={<About />}
            />
            <Route
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
            <Route
              path="*"
              element={<NotFound />}
            /> */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </FavoritesProvider>
  </QueryClientProvider>
);

export default App;
