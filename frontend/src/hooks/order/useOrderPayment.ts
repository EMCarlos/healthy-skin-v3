import { ordersApi } from "@/services/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui";

export const useOrderPayment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const payOrderMutation = useMutation({
    mutationFn: ({ orderId, paymentResult }: { orderId: number; paymentResult?: any }) =>
      ordersApi.payOrder(orderId, paymentResult),
    onSuccess: (data, { orderId }) => {
      toast({
        title: "Payment processed",
        description: "Your payment has been processed successfully.",
        variant: "default",
      });
      // Invalidate order lists to reflect payment status
      queryClient.invalidateQueries({ queryKey: ["orderDetails"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
    onError: (error: any) => {
      toast({
        title: "Payment failed",
        description:
          error.response && error.response.data.detail
            ? error.response?.data?.detail || "An error occurred while processing your payment."
            : error.message,
        variant: "destructive",
      });
    },
  });

  return {
    payOrder: (orderId: number, paymentResult?: any) =>
      payOrderMutation.mutate({ orderId, paymentResult }),
    isProcessingPayment: payOrderMutation.isPending,
    paymentError: payOrderMutation.error,
  };
};
