// Authentication hooks
export * from "./auth";

// User management hooks
export * from "./user";

// Product hooks
export * from "./product";

// Order/Checkout hooks
export * from "./order";

// UI hooks
export * from "./ui";

// Initial hooks (for backward compatibility)
export { useUser, useCheckout } from "./useQueries";
