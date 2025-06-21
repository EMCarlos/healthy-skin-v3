import { userApi } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export const useUsersList = () => {
  const {
    data: usersList,
    isLoading: isLoadingUsersList,
    error: errorUsersList,
  } = useQuery({
    queryKey: ["listUsers"],
    queryFn: userApi.listUsers,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    usersList,
    isLoadingUsersList,
    errorUsersList,
  };
};
