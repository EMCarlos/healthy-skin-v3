import axios from "@/lib/axios";
import { Product } from "@/types";
import { parseImageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";

type ProductsResponse = {
  products: Product[];
  page: number;
  pages: number;
};

const getProductList = async () => {
  const { data } = await axios.get<ProductsResponse>(`/api/products`, { params: { public: true } });

  return data;
};

export const useGetProductList = () => {
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
  } = useQuery<any>({
    queryKey: ["products-list"],
    queryFn: getProductList,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    select: (data: ProductsResponse) =>
      data.products?.map((product: Product) => {
        return {
          ...product,
          image: parseImageUrl(product.image),
        };
      }),
    retry: 1,
  });

  return {
    products: (products as Product[]) || [],
    isLoading: isLoading || isFetching,
    isError,
  };
};

export default useGetProductList;
