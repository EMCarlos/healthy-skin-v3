import { productApi } from "@/services/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useProductDelete = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteProductMutation = useMutation({
    mutationFn: productApi.deleteProduct,
    onSuccess: (_, productId) => {
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully.",
        variant: "default",
      });
      // Remove the product from cache
      queryClient.removeQueries({ queryKey: ["product", productId] });
      // Invalidate products list to refetch without deleted product
      queryClient.invalidateQueries({ queryKey: ["products-list"] });
      queryClient.invalidateQueries({ queryKey: ["featuredProducts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Delete failed",
        description:
          error.response && error.response.data.detail
            ? error.response?.data?.detail || "An error occurred while deleting the product."
            : error.message,
        variant: "destructive",
      });
    },
  });

  return {
    deleteProduct: deleteProductMutation.mutate,
    isDeleting: deleteProductMutation.isPending,
    deleteError: deleteProductMutation.error,
  };
};
