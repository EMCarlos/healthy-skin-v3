import { useState } from "react";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would add the actual subscription logic
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-purple text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center bg-white/10 p-3 rounded-full mb-6">
            <Mail className="h-6 w-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Join Our Skincare Community
          </h2>
          <p className="text-white/80 mb-8">
            Subscribe to our newsletter and get 15% off your first order, plus receive skincare
            tips, exclusive offers, and early access to new products.
          </p>

          {isSubscribed ? (
            <div className="bg-white/10 p-6 rounded-lg animate-scale-in">
              <h3 className="text-2xl font-playfair font-semibold mb-2">Thank You!</h3>
              <p>
                You've successfully subscribed to our newsletter. Your discount code will be emailed
                to you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-full px-6 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <button
                  type="submit"
                  className="bg-gold text-purple font-semibold rounded-full px-8 py-3 hover:bg-gold/90 transition-colors shadow-md"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-white/60">
                By subscribing, you agree to our{" "}
                <a
                  href="/privacy"
                  className="underline hover:text-gold transition-colors"
                >
                  Privacy Policy
                </a>
                . You can unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
