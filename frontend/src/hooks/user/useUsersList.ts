import { userApi } from "@/services/apiServices";
import useGeneralStore from "@/store";
import { useQuery } from "@tanstack/react-query";

export const useUsersList = () => {
  const { userLogged } = useGeneralStore();
  const {
    data: usersList,
    isLoading: isLoadingUsersList,
    error: errorUsersList,
  } = useQuery({
    queryKey: ["listUsers"],
    enabled: !!userLogged && userLogged?.isAdmin,
    queryFn: userApi.listUsers,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    usersList,
    isLoadingUsersList,
    errorUsersList,
  };
};
