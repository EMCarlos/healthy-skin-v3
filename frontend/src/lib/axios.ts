import useGeneralStore from "@/store";
import axios, { AxiosHeaders } from "axios";

export const REST_API_URL = import.meta.env.VITE_API_BASE_URL;

function authRequestInterceptor() {
  const store = useGeneralStore.getState();
  const user = store.userLogged;
  const token = user?.token;
  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      if (config.params?.public) return config;

      if (!config.headers) {
        config.headers = {} as AxiosHeaders;
      }
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  });
}

const axiosInstance = axios.create({
  baseURL: REST_API_URL,
});

authRequestInterceptor();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
