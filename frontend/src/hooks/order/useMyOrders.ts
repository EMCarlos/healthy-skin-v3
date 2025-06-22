import { ordersApi } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export const useMyOrders = () => {
  const {
    data: myOrders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: ordersApi.getMyOrders,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    myOrders,
    isLoadingMyOrders: isLoading,
    myOrdersError: error,
  };
};
