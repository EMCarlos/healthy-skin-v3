import { checkoutApi, userApi, productApi } from "@/services/apiServices";
import { CartItem } from "@/types";
import { parseImageUrl } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// User query hooks
export const useUser = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: userApi.login,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      queryClient.setQueryData(["getUserDetails"], data);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const logout = () => userApi.logout();

  return {
    login: loginMutation.mutate,
    logout,
    loginError: loginMutation.error,
  };
};

// Product query hooks
export const useProducts = () => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productApi.getProducts,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return { products: (products as any).products, isLoading, error };
};

export const useProduct = (id: number | undefined) => {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => (id ? productApi.getProductById(id) : Promise.reject("No ID provided")),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours,
  });

  return { product, isLoading, error };
};

// Checkout query hooks
export const useCheckout = () => {
  const queryClient = useQueryClient();

  const submitOrderMutation = useMutation({
    mutationFn: checkoutApi.submitOrder,
    onSuccess: () => {
      // After successful checkout, clear cart
      queryClient.setQueryData(["cart"], []);
      // Invalidate order history if it exists
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const {
    data: orderHistory = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: checkoutApi.getOrderHistory,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    submitOrder: submitOrderMutation.mutate,
    isSubmitting: submitOrderMutation.isPending,
    submitError: submitOrderMutation.error,
    orderHistory,
    isLoadingOrders: isLoading,
    ordersError: error,
  };
};
