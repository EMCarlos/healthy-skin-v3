import { ordersApi } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export const useOrderDetails = (orderId: number | undefined) => {
  const {
    data: orderDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () =>
      orderId ? ordersApi.getOrderDetails(orderId) : Promise.reject("No order ID provided"),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    orderDetails,
    isLoadingOrderDetails: isLoading,
    orderDetailsError: error,
  };
};
