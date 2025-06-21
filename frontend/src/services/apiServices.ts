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
    const { data } = await axios.put(`/api/users/${userData?.id}/`, userData);
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

// Cart API services
export const cartApi = {
  getCart: async (): Promise<CartItem[]> => {
    const { data } = await axios.get("/cart/");
    return data;
  },

  addToCart: async (item: CartItem): Promise<CartItem> => {
    const { data } = await axios.post("/cart/", item);
    return data;
  },

  updateCartItem: async (id: number, quantity: number): Promise<CartItem> => {
    const { data } = await axios.put(`/cart/${id}/`, { quantity });
    return data;
  },

  removeFromCart: async (id: number): Promise<void> => {
    await axios.delete(`/cart/${id}/`);
  },

  clearCart: async (): Promise<void> => {
    await axios.delete("/cart/");
  },
};

// Checkout API services
export const checkoutApi = {
  submitOrder: async (checkoutData: CheckoutForm): Promise<any> => {
    const { data } = await axios.post("/api/orders/", checkoutData);
    return data;
  },

  getOrderHistory: async (): Promise<any[]> => {
    const { data } = await axios.get("/api/orders/");
    return data;
  },
};
