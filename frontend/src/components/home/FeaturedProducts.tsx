import useGetProductList from "@/hooks/useGetProductList";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton";
import { Chip } from "../ui/chip";

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { isLoading, products } = useGetProductList();
  const categories = useMemo(() => {
    if (!products?.length) return [];
    const uniqueCategories = new Set(products?.map((product) => product.brand));

    return ["All", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products?.filter((product) => product.brand === activeCategory),
    [products, activeCategory]
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-4">
            Featured Brands
          </h2>
          <p className="text-purple/70 max-w-2xl mx-auto">
            Shop our most popular products from top skincare brands - 100% authentic and direct from
            authorized distributors.
          </p>
        </div>

        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories?.map((category) => (
              <Chip
                key={category}
                category={category}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => <ProductCardSkeleton key={index} />)
            : filteredProducts?.map((product) => (
                <ProductCard
                  key={product._id}
                  isLoading={isLoading}
                  {...product}
                />
              ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-purple font-medium hover:text-purple-dark transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
