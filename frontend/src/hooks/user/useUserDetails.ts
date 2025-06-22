import { userApi } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id?: number;
};

export const useUserDetails = ({ id }: Props) => {
  const {
    data: userDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getUserDetails", id],
    queryFn: () => userApi.getUserDetails(id ?? 0),
    enabled: !!id,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours,
  });

  return {
    userDetails,
    isLoading,
    error,
    isLoggedIn: !!userDetails,
  };
};
