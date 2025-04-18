import useGeneralStore from "@/store";
import { Heart, Menu, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const favorites = useGeneralStore((state) => state.favorites);

  return (
    <header className="w-full bg-white shadow-sm z-50 sticky top-0">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
          >
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-purple">
              Healthy <span className="text-gold">Skin</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="font-medium hover:text-purple transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="font-medium hover:text-purple transition-colors"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="font-medium hover:text-purple transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="font-medium hover:text-purple transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/favorites"
              className="p-2 hover:bg-beige rounded-full transition-colors relative"
            >
              <Heart className="h-5 w-5 text-purple" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              className="p-2 hover:bg-beige rounded-full transition-colors"
            >
              <User className="h-5 w-5 text-purple" />
            </Link>
            <Link
              to="/cart"
              className="p-2 hover:bg-beige rounded-full transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5 text-purple" />
              <span className="absolute -top-1 -right-1 bg-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-purple"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="py-2 font-medium hover:text-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="py-2 font-medium hover:text-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="py-2 font-medium hover:text-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="py-2 font-medium hover:text-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>

            {/* Mobile Icons */}
            <div className="flex items-center space-x-6 mt-6 pt-4 border-t border-gray-100">
              <Link
                to="/wishlist"
                className="flex items-center space-x-2 hover:text-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>
              <Link
                to="/account"
                className="flex items-center space-x-2 hover:text-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center space-x-2 hover:text-purple transition-colors relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
                <span className="absolute -top-1 -right-1 bg-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
