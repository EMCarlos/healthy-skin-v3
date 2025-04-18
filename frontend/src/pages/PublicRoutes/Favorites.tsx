import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import useGeneralStore from "@/store";

const Favorites = () => {
  const favorites = useGeneralStore((state) => state.favorites);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow ">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              My Favorites
            </h1>
            <p className="text-white/80 max-w-3xl">
              Your collection of favorite skincare products.
            </p>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-lg">
              <p className="text-lg text-white/90">No favorites added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <div
                  key={product._id}
                  className="transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <ProductCard {...product} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
