import { ordersApi, userApi, productApi } from "@/services/apiServices";
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
  const {
    data: orderHistory = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: ordersApi.getOrderHistory,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    orderHistory,
    isLoadingOrders: isLoading,
    ordersError: error,
  };
};
