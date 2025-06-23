import { productApi } from "@/services/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui";
import { Product } from "@/types";

export const useProductUpdate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateProductMutation = useMutation({
    mutationFn: productApi.updateProduct,
    onSuccess: (data) => {
      toast({
        title: "Product updated",
        description: "The product has been updated successfully.",
        variant: "default",
      });
      // Update the specific product in cache
      queryClient.setQueryData(["product", data._id], data);
      // Invalidate products list to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["products-list"] });
      queryClient.invalidateQueries({ queryKey: ["featuredProducts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description:
          error.response && error.response.data.detail
            ? error.response?.data?.detail || "An error occurred while updating the product."
            : error.message,
        variant: "destructive",
      });
    },
  });

  return {
    updateProduct: updateProductMutation.mutate,
    isUpdating: updateProductMutation.isPending,
    updateError: updateProductMutation.error,
  };
};
