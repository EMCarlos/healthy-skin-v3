import { checkoutApi } from "@/services/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useOrderSubmit = () => {
  const queryClient = useQueryClient();

  const submitOrderMutation = useMutation({
    mutationFn: checkoutApi.submitOrder,
    onSuccess: () => {
      // After successful checkout, clear cart
      queryClient.setQueryData(["cart"], []);
      // Invalidate order history if it exists
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    submitOrder: submitOrderMutation.mutate,
    isSubmitting: submitOrderMutation.isPending,
    submitError: submitOrderMutation.error,
  };
};
