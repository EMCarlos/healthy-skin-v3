import axios from "@/lib/axios";
import { CheckoutForm } from "@/store/types";
import { AuthUser, CartItem, Product } from "@/types";
import useGeneralStore from "@/store";

// User API services
export const userApi = {
  login: async (credentials: { username: string; password: string }): Promise<AuthUser> => {
    const { data } = await axios.post("/api/users/login/", credentials);
    return data;
  },

  register: async (userData: any): Promise<AuthUser> => {
    const { data } = await axios.post("/api/users/register/", userData);
    return data;
  },

  getUserDetails: async (id: number): Promise<AuthUser> => {
    const { data } = await axios.get(`/api/users/${id}/`);
    return data;
  },

  updateUser: async (userData: any): Promise<AuthUser> => {
    const { data } = await axios.put(`/api/users/profile/update/`, userData);
    return data;
  },

  listUsers: async (): Promise<AuthUser[]> => {
    const { data } = await axios.get("/api/users/");
    return data;
  },

  updateUserAsAdmin: async (userData: any): Promise<AuthUser> => {
    const { data } = await axios.put(`/api/users/update/${userData?.id}/`, userData);
    return data;
  },

  deleteUserAsAdmin: async (id: number): Promise<void> => {
    await axios.delete(`/api/users/delete/${id}/`);
  },

  logout: async (): Promise<void> => {
    // await axios.post("/api/users/logout/");
    localStorage.removeItem("userInfo");
    useGeneralStore.getState().setUserLogged(null);
    useGeneralStore.getState().setIsLogged(false);
  },
};

// Product API services
export const productApi = {
  getProducts: async (): Promise<Product[]> => {
    const { data } = await axios.get("/api/products/");
    return data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const { data } = await axios.get(`/api/products/${id}/`);
    return data;
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    const { data } = await axios.get("/api/products/top/");
    return data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await axios.delete(`/api/products/delete/${id}/`);
  },

  createProduct: async (): Promise<Product> => {
    const { data } = await axios.post(`/api/products/create/`, {});
    return data;
  },

  updateProduct: async (product: Product): Promise<Product> => {
    const { data } = await axios.put(`/api/products/update/${product._id}/`, product);
    return data;
  },

  createProductReview: async (productId: number, review: any): Promise<any> => {
    const { data } = await axios.post(`/api/products/${productId}/reviews/`, review);
    return data;
  },
};

// Checkout API services
export const ordersApi = {
  createOrders: async (cartItems: CartItem[]): Promise<any> => {
    const { data } = await axios.post("/api/orders/add/", { cartItems });
    return data;
  },

  submitOrder: async (checkoutData: CheckoutForm): Promise<any> => {
    const { data } = await axios.post("/api/orders/", checkoutData);
    return data;
  },

  getOrderHistory: async (): Promise<any[]> => {
    const { data } = await axios.get("/api/orders/");
    return data;
  },

  getMyOrders: async (): Promise<any[]> => {
    const { data } = await axios.get("/api/orders/myorders/");
    return data;
  },

  getOrderDetails: async (id: number): Promise<any> => {
    const { data } = await axios.get(`/api/orders/${id}/`);
    return data;
  },

  payOrder: async (orderId: number, paymentResult: any): Promise<any> => {
    const { data } = await axios.put(`/api/orders/${orderId}/pay/`, paymentResult);
    return data;
  },

  deliverOrder: async (orderId: number): Promise<any> => {
    const { data } = await axios.put(`/api/orders/${orderId}/deliver/`);
    return data;
  },
};
