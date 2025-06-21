import { ordersApi } from "@/services/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useOrderDelivery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deliverOrderMutation = useMutation({
    mutationFn: ordersApi.deliverOrder,
    onSuccess: (data, orderId) => {
      toast({
        title: "Order delivered",
        description: "The order has been marked as delivered successfully.",
        variant: "default",
      });
      // Update the specific order details
      queryClient.setQueryData(["orderDetails", orderId], data);
      // Invalidate order lists to reflect delivery status
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
    onError: (error: any) => {
      toast({
        title: "Delivery update failed",
        description:
          error.response && error.response.data.detail
            ? error.response?.data?.detail ||
              "An error occurred while updating the delivery status."
            : error.message,
        variant: "destructive",
      });
    },
  });

  return {
    deliverOrder: deliverOrderMutation.mutate,
    isUpdatingDelivery: deliverOrderMutation.isPending,
    deliveryError: deliverOrderMutation.error,
  };
};
