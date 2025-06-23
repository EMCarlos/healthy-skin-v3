import useGeneralStore from "@/store";
import { Product } from "@/types";
import { Ban, Heart, ShoppingCart, Star, Tag } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/bagde";

type Props = { isLoading?: boolean };

const ProductCard = ({
  _id,
  name,
  price,
  image,
  rating,
  category,
  isLoading,
  countInStock,
  discount,
  brand,
}: Product & Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useGeneralStore();
  const addToCart = useGeneralStore((state) => state.addToCart);
  const isProductFavorite = isFavorite(_id);
  const isOutOfStock = useMemo(() => countInStock === 0, [countInStock]);
  const finalPrice = useMemo(() => {
    const numberPrice = Number(price);
    const numberDiscount = Number(discount);

    if (!price || !discount) return numberPrice ?? 0;
    return numberDiscount > 0 ? numberPrice * (1 - Number(numberDiscount) / 100) : numberPrice;
  }, [price, discount]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isProductFavorite) {
      removeFromFavorites(_id);
    } else {
      addToFavorites({ _id, name, price, image, rating, category, brand, countInStock });
    }
  };

  return (
    <div
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {Number(discount) > 0 && (
          <Badge className="bg-purple text-white">
            <Tag className="h-3.5 w-3.5 mr-1" />
            {Number(discount).toFixed(0)}% OFF
          </Badge>
        )}
        {isOutOfStock && (
          <Badge
            variant="destructive"
            className="bg-red-400 text-white"
          >
            <Ban className="h-3.5 w-3.5 mr-1" />
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Favorite Button */}
      <button
        className="absolute top-3 right-3 z-10 p-1.5 bg-white rounded-full shadow-sm transition-all duration-300 hover:bg-beige"
        onClick={handleFavoriteClick}
      >
        <Heart
          className={`h-5 w-5 ${isProductFavorite ? "fill-purple text-purple" : "text-gray-400"}`}
        />
      </button>

      {/* Product Image with Link */}
      <Link
        to={`/product/${_id}`}
        className="block overflow-hidden"
      >
        <div className="h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-contain transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        </div>
      </Link>

      {/* Quick Add to Cart Button - Appears on Hover */}
      <div
        className={`absolute bottom-[5.5rem] left-0 right-0 flex justify-center transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          className="bg-purple text-white py-2 px-4 rounded-full shadow-md hover:bg-purple-dark transition-colors flex items-center space-x-2"
          disabled={isLoading || isOutOfStock} // Disable button if loading
          onClick={(e) => {
            e.preventDefault();
            if (isOutOfStock) return;
            addToCart({
              product: _id,
              _id,
              name,
              price,
              image,
              rating,
              category,
              quantity: 1,
              countInStock: countInStock ?? 0,
            });
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Quick Add</span>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-xs text-purple/70 uppercase tracking-wider mb-1">{category}</div>
        <Link to={`/product/${_id}`}>
          <h3 className="font-medium text-base md:text-lg mb-1 hover:text-purple transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Number(rating ?? 0) ? "text-gold fill-gold" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({Number(rating ?? 0).toFixed(1)})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-purple">${finalPrice.toFixed(2)}</span>
          {Number(discount) > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${Number(price ?? 0)?.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
