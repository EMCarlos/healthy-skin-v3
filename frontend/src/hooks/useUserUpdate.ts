import { userApi } from "@/services/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import useGeneralStore from "@/store";

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setUserLogged } = useGeneralStore();

  const updateUserMutation = useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: (data) => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        variant: "default",
      });
      queryClient.setQueryData(["currentUser"], data);
      setUserLogged(data);
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description:
          error.response && error.response.data.detail
            ? error.response?.data?.detail || "An error occurred while updating your profile."
            : error.message,
        variant: "destructive",
      });
    },
  });

  return {
    updateUser: updateUserMutation.mutate,
    updateUserLoading: updateUserMutation.isPending,
    updateUserError: updateUserMutation.error,
  };
};
