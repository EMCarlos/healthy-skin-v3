import { ordersApi } from "@/services/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui";
import { CartItem, CustomerOrder } from "@/types";
import useGeneralStore from "@/store";
import { useNavigate } from "react-router-dom";

export const useOrderCreate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setCheckoutForm, clearCart } = useGeneralStore();

  const createOrderMutation = useMutation({
    mutationFn: (order: CustomerOrder) => ordersApi.createOrders(order),
    onSuccess: (data) => {
      toast({
        title: "Order created",
        description: "Your order has been created successfully.",
        variant: "default",
      });
      // Clear cart after successful order creation
      queryClient.setQueryData(["cart"], []);
      clearCart();
      // Reset checkout form
      setCheckoutForm(null);
      // Invalidate orders to refetch with new order
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });

      // Navigate to order confirmation page
      navigate(`/order-confirmation?id=${data._id}`, { replace: true });
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
      navigate("/cart", { replace: true });
    },
  });

  return {
    createOrder: createOrderMutation.mutate,
    isCreatingOrder: createOrderMutation.isPending,
    createOrderError: createOrderMutation.error,
  };
};
