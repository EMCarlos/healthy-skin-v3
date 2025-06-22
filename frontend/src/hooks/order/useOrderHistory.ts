import { ordersApi } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export const useOrderHistory = () => {
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
