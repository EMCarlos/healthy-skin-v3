import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProductList } from "@/hooks";
import { useProductFilters } from "@/hooks";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

const Products = () => {
  const { isLoading, products = [] } = useGetProductList();
  const { getFilteredProducts } = useProductFilters();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all-categories");
  const [selectedBrand, setSelectedBrand] = useState("all-brands");

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);
  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))], [products]);

  const filteredAndSortedProducts = useMemo(() => {
    return getFilteredProducts({
      products,
      searchQuery,
      selectedCategory,
      selectedBrand,
      sortBy,
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, sortBy, getFilteredProducts]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-4">
              Shop All Brands
            </h1>
            <p className="text-purple/70 max-w-3xl">
              Discover our complete collection of premium skincare products from The Ordinary,
              Paula's Choice, CeraVe, and more - all 100% authentic and at the best prices.
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={sortBy}
                onValueChange={setSortBy}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  <SelectItem value="nameAsc">Name: A to Z</SelectItem>
                  <SelectItem value="nameDesc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem
                      key={category ?? index}
                      value={category ?? ""}
                    >
                      {category ?? ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedBrand}
                onValueChange={setSelectedBrand}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-brands">All Brands</SelectItem>
                  {brands.map((brand, index) => (
                    <SelectItem
                      key={brand ?? index}
                      value={brand ?? ""}
                    >
                      {brand ?? ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? [...Array(8)].map((_, index) => <ProductCardSkeleton key={`skeleton-${index}`} />)
              : filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    {...product}
                  />
                ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
