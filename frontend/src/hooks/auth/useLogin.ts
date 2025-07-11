import axios from "@/lib/axios";
import useGeneralStore from "@/store";
import { AxiosHeaders } from "axios";
import { useState } from "react";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userLogged, setUserLogged, setIsLogged } = useGeneralStore();

  const login = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/users/login/", { username: email, password }, config);

      axios.interceptors.request.use((config) => {
        if (data?.token) {
          config.headers["Authorization"] = `Bearer ${data.token}`;
        }
        return config;
      });

      setUserLogged(data);
      setIsLogged(true);
    } catch (err: any) {
      setError(err.response && err.response.data.detail ? err.response.data.detail : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, userLogged };
};

export default useLogin;
