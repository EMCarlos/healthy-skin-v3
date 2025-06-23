import { ordersApi } from "@/services/apiServices";
import useGeneralStore from "@/store";
import { useQuery } from "@tanstack/react-query";

export const useOrderHistory = () => {
  const { userLogged } = useGeneralStore();
  const {
    data: orderHistory = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    enabled: !!userLogged && userLogged?.isAdmin,
    queryFn: ordersApi.getOrderHistory,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    orderHistory,
    isLoadingOrders: isLoading,
    ordersError: error,
  };
};
