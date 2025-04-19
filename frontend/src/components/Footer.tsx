import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-peach text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Healthy Skin</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Premium dermocosmetic products backed by science for radiant, healthy skin. Our
              products combine natural ingredients with scientific innovation.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/healthyskin.au"
                className="hover:text-gold transition-colors"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/healthyskin.au/"
                className="hover:text-gold transition-colors"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="hover:text-gold transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-gold transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-gold transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                <span>123 Beauty Street, Skincare City, SC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>hello@healthyskin.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Stay Updated</h3>
            <p className="mb-4 text-sm">
              Subscribe to our newsletter for skincare tips and exclusive offers.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded text-purple placeholder:text-purple/60 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                className="bg-gold text-purple font-semibold px-4 py-2 rounded hover:bg-gold/80 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 mt-6 border-t border-white/20 text-sm text-center md:text-left md:flex md:justify-between">
          <p>&copy; {new Date().getFullYear()} Healthy Skin. All rights reserved.</p>
          <div className="mt-2 md:mt-0 space-x-4">
            <Link
              to="/privacy"
              className="hover:text-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-gold transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
