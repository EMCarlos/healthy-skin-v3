import { productApi } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export const useFeaturedProducts = () => {
  const {
    data: featuredProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: productApi.getFeaturedProducts,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    featuredProducts,
    isLoading,
    error,
  };
};
