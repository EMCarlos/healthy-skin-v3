import { productApi } from "@/services/apiServices";
import { parseImageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: number | undefined) => {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => (id ? productApi.getProductById(id) : Promise.reject("No ID provided")),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return { product, isLoading, error };
};
