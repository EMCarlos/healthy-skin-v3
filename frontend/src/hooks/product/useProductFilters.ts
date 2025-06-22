import { Product } from "@/types";

const useProductFilters = () => {
  const getFilteredProducts = ({
    products,
    searchQuery,
    selectedCategory,
    selectedBrand,
    sortBy,
  }: {
    products: Product[];
    searchQuery: string;
    selectedCategory: string;
    selectedBrand: string;
    sortBy: string;
  }) =>
    products
      .filter((product) => {
        const matchesSearch =
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
        const matchesCategory =
          selectedCategory === "all-categories" || product.category === selectedCategory;
        const matchesBrand = selectedBrand === "all-brands" || product.brand === selectedBrand;
        return matchesSearch && matchesCategory && matchesBrand;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
          case "oldest":
            return new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime();
          case "priceAsc":
            return Number(a.price ?? 0) - Number(b.price ?? 0);
          case "priceDesc":
            return Number(b.price ?? 0) - Number(a.price ?? 0);
          case "nameAsc":
            return (a.name ?? "").localeCompare(b.name ?? "");
          case "nameDesc":
            return (b.name ?? "").localeCompare(a.name ?? "");
          default:
            return 0;
        }
      });

  return {
    getFilteredProducts,
  };
};

export default useProductFilters;
