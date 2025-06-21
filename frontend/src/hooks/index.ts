// User hooks
export { useUserDetails } from "./useUserDetails";
export { useUsersList } from "./useUsersList";
export { useUserUpdate } from "./useUserUpdate";
export { useUserAdminActions } from "./useUserAdminActions";

// Product hooks
export { useProduct } from "./useProduct";
export { useFeaturedProducts } from "./useFeaturedProducts";
export { useProductCreate } from "./useProductCreate";
export { useProductUpdate } from "./useProductUpdate";
export { useProductDelete } from "./useProductDelete";
export { useProductReview } from "./useProductReview";

// Order/Checkout hooks
export { useOrderHistory } from "./useOrderHistory";
export { useOrderSubmit } from "./useOrderSubmit";

// Existing hooks (for backward compatibility)
export { useUser, useCheckout } from "./useQueries";
