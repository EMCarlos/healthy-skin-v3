import { productApi } from "@/services/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useProductReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createReviewMutation = useMutation({
    mutationFn: ({ productId, review }: { productId: number; review: any }) =>
      productApi.createProductReview(productId, review),
    onSuccess: (_, { productId }) => {
      toast({
        title: "Review submitted",
        description: "Your review has been submitted successfully.",
        variant: "default",
      });
      // Invalidate the specific product to refetch with new review
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
    onError: (error: any) => {
      toast({
        title: "Review failed",
        description:
          error.response && error.response.data.detail
            ? error.response?.data?.detail || "An error occurred while submitting your review."
            : error.message,
        variant: "destructive",
      });
    },
  });

  return {
    createReview: (productId: number, review: any) =>
      createReviewMutation.mutate({ productId, review }),
    isSubmittingReview: createReviewMutation.isPending,
    reviewError: createReviewMutation.error,
  };
};
