import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useProduct } from "@/hooks";
import useGetProductList from "@/hooks/useGetProductList";
import useGeneralStore from "@/store";
import { parseImageUrl } from "@/utils";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

//TODO
// Mock reviews data - empty for the product?
const reviews: Array<{
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}> = [];

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { product: response, isLoading } = useProduct(Number(productId ?? 0));
  const product = useMemo(() => {
    if (!response) return null;
    return {
      ...response,
      image: parseImageUrl(response.image),
    };
  }, [response]);
  const { addToFavorites, removeFromFavorites, isFavorite, addToCart } = useGeneralStore();
  const inStock = useMemo(() => (product?.countInStock ?? 0) > 0, [product?.countInStock]);

  const [quantity, setQuantity] = useState(1);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  if (!isLoading && !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product? you are looking for does not exist.</p>
            <Link to="/products">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isProductFavorite = isFavorite(product?._id);
  const productReviews = reviews.filter((review) => review.productId === product?._id);
  const finalPrice = product?.discount
    ? Number(product?.price ?? 0) * (1 - Number(product?.discount ?? 0) / 100)
    : Number(product?.price ?? 0);

  const handleFavoriteClick = () => {
    if (isProductFavorite) {
      removeFromFavorites(product?._id);
    } else {
      addToFavorites({
        _id: product?._id,
        name: product?.name,
        price: product?.price,
        image: product?.image,
        rating: product?.rating ?? "0",
        category: product?.category,
      });
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the review to a backend
    console.log("Review submitted:", {
      name: reviewName,
      rating: reviewRating,
      comment: reviewComment,
    });
    // Reset form
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
    // Show success message (in a real app, you'd use a toast notification)
    alert("Thank you for your review! It will appear after moderation.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center text-sm text-gray-500">
            <Link
              to="/"
              className="hover:text-purple"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              to="/products"
              className="hover:text-purple"
            >
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-purple">{product?.name}</span>
          </div>

          {/* Product Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-auto object-contain aspect-square"
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="text-sm text-purple/70 uppercase tracking-wider mb-1">
                {product?.brand}
              </div>
              <h1 className="text-3xl font-playfair font-bold text-purple mb-2">{product?.name}</h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Number(product?.rating ?? 0) ? "text-gold fill-gold" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2">
                  ({Number(product?.rating ?? 0).toFixed(1)})
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-purple">
                    ${finalPrice.toFixed(2)}
                  </span>
                  {product?.discount && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ${Number(product?.price ?? 0)?.toFixed(2)}
                      </span>
                      <span className="text-sm font-medium text-red-500">
                        {product?.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Short Description */}
              <p className="text-gray-600 mb-6">{product?.about}</p>

              {/* Add to Cart Section */}
              <div className="flex flex-col space-y-4 mb-8">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-r-none"
                  >
                    -
                  </Button>
                  <div className="px-4 py-2 border-y border-x-0 border-input min-w-[3rem] text-center">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-l-none"
                  >
                    +
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    disabled={isLoading || !inStock}
                    className="flex-1 bg-purple hover:bg-purple-dark"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!inStock) return;
                      addToCart({
                        _id: product?._id,
                        name: product?.name,
                        price: product?.price,
                        image: product?.image,
                        rating: product?.rating ?? "0",
                        category: product?.category,
                        quantity,
                      });
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleFavoriteClick}
                    className={isProductFavorite ? "bg-pink-50" : ""}
                  >
                    <Heart
                      className={`h-5 w-5 ${isProductFavorite ? "fill-purple text-purple" : ""}`}
                    />
                  </Button>
                </div>
              </div>

              {/* Product Details - Category, In Stock */}
              <div className="space-y-2 text-sm mb-6">
                <div className="flex">
                  <span className="font-medium w-24">Category:</span>
                  <span>{product?.category}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-24">Availability:</span>
                  <span className={inStock ? "text-green-600" : "text-red-500"}>
                    {inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <Tabs
            defaultValue="description"
            className="mb-16"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              {/* <TabsTrigger value="ingredients">Ingredients</TabsTrigger> */}
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent
              value="description"
              className="space-y-4"
            >
              <h3 className="text-xl font-playfair font-bold text-purple">About This Product</h3>
              <p className="text-gray-600">{product?.description}</p>

              {/* <h4 className="text-lg font-semibold text-purple mt-6">How to Use</h4>
              <p className="text-gray-600">{product?.description}</p> */}
            </TabsContent>

            <TabsContent value="ingredients">
              <h3 className="text-xl font-playfair font-bold text-purple mb-4">Ingredients</h3>
              {/* <p className="text-gray-600">{product?.ingredients}</p> */}
            </TabsContent>

            <TabsContent
              value="reviews"
              className="space-y-8"
            >
              <h3 className="text-xl font-playfair font-bold text-purple">Customer Reviews</h3>

              {/* Reviews List */}
              <div className="space-y-6">
                {productReviews.length === 0 ? (
                  <Card className="p-8 text-center">
                    <div className="mb-4">
                      <Star className="h-12 w-12 mx-auto text-gray-300" />
                    </div>
                    <h4 className="text-lg font-medium mb-2">No Reviews Yet</h4>
                    <p className="text-gray-500 mb-4">
                      This product? doesn't have any reviews yet. Be the first to share your
                      thoughts!
                    </p>
                  </Card>
                ) : (
                  productReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-6"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{review.userName}</span>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-gold fill-gold" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Write a Review Form */}
              <div className="mt-8">
                <Separator className="my-8" />
                <h4 className="text-lg font-medium mb-4">Write a Review</h4>
                <form
                  onSubmit={handleSubmitReview}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium mb-1"
                    >
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setReviewRating(rating)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              rating <= reviewRating ? "text-gold fill-gold" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium mb-1"
                    >
                      Review
                    </label>
                    <Textarea
                      id="comment"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience with this product?..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-purple hover:bg-purple-dark"
                  >
                    Submit Review
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
