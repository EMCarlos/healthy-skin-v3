import { ordersApi } from "@/services/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui";
import { CartItem } from "@/types";

export const useOrderCreate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createOrderMutation = useMutation({
    mutationFn: (cartItems: CartItem[]) => ordersApi.createOrders(cartItems),
    onSuccess: (data) => {
      toast({
        title: "Order created",
        description: "Your order has been created successfully.",
        variant: "default",
      });
      // Clear cart after successful order creation
      queryClient.setQueryData(["cart"], []);
      // Invalidate orders to refetch with new order
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
    onError: (error: any) => {
      toast({
        title: "Order creation failed",
        description:
          error.response && error.response.data.detail
            ? error.response?.data?.detail || "An error occurred while creating your order."
            : error.message,
        variant: "destructive",
      });
    },
  });

  return {
    createOrder: createOrderMutation.mutate,
    isCreatingOrder: createOrderMutation.isPending,
    createOrderError: createOrderMutation.error,
  };
};
