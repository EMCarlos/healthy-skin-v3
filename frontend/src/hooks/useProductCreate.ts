import { productApi } from "@/services/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useProductCreate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createProductMutation = useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: (data) => {
      toast({
        title: "Product created",
        description: "The product has been created successfully.",
        variant: "default",
      });
      // Invalidate products list to refetch with new product
      queryClient.invalidateQueries({ queryKey: ["products-list"] });
    },
    onError: (error: any) => {
      toast({
        title: "Create failed",
        description:
          error.response && error.response.data.detail
            ? error.response?.data?.detail || "An error occurred while creating the product."
            : error.message,
        variant: "destructive",
      });
    },
  });

  return {
    createProduct: createProductMutation.mutate,
    isCreating: createProductMutation.isPending,
    createError: createProductMutation.error,
  };
};
