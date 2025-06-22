import { userApi } from "@/services/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui";

export const useUserAdminActions = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateUserAsAdminMutation = useMutation({
    mutationFn: userApi.updateUserAsAdmin,
    onSuccess: (data) => {
      toast({
        title: "User updated",
        description: "The user has been updated successfully.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["listUsers"] });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description:
          error.response && error.response.data.detail
            ? error.response?.data?.detail || "An error occurred while updating the user."
            : error.message,
        variant: "destructive",
      });
    },
  });

  const deleteUserAsAdminMutation = useMutation({
    mutationFn: userApi.deleteUserAsAdmin,
    onSuccess: (id) => {
      toast({
        title: "User deleted",
        description: "The user has been deleted successfully.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["listUsers"] });
    },
    onError: (error: any) => {
      toast({
        title: "Delete failed",
        description:
          error.response && error.response.data.detail
            ? error.response?.data?.detail || "An error occurred while deleting the user."
            : error.message,
        variant: "destructive",
      });
    },
  });

  return {
    updateUserAsAdmin: updateUserAsAdminMutation.mutate,
    updateUserAsAdminLoading: updateUserAsAdminMutation.isPending,
    deleteUserAsAdmin: deleteUserAsAdminMutation.mutate,
    deleteUserAsAdminLoading: deleteUserAsAdminMutation.isPending,
    deleteUserAsAdminError: deleteUserAsAdminMutation.error,
  };
};
