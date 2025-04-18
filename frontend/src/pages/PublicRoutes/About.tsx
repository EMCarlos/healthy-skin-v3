import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Heart, Leaf, Shield, Star } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        {/* Hero Section */}
        <section className="bg-beige py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-purple mb-6">
                Our Story
              </h1>
              <p className="text-lg text-purple/80 mb-8">
                We're passionate about bringing you the finest dermocosmetic brands and products,
                carefully selected to deliver real results for your skin concerns.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-playfair font-bold text-purple mb-6">Our Mission</h2>
                <p className="text-purple/70 mb-6">
                  As a trusted distributor of premium skincare brands like The Ordinary and other
                  leading names, we're committed to making science-backed skincare accessible to
                  everyone.
                </p>
                <p className="text-purple/70">
                  We carefully select each brand in our catalog, ensuring they meet our standards
                  for quality, effectiveness, and ethical practices, so you can shop with
                  confidence.
                </p>
              </div>
              <div className="relative">
                <div className="columns-2 sm:columns-3 gap-4 space-y-4">
                  <img
                    loading="lazy"
                    className="w-full mb-4 aspect-[3/4] object-cover rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    src="https://images.unsplash.com/photo-1624984674735-7ecdbd7de244?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
                    alt="Woman applying skincare product"
                  />
                  <img
                    loading="lazy"
                    className="w-full mb-4 aspect-[3/4] object-cover rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    src="https://images.unsplash.com/photo-1535031171703-48b1362baa98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    alt="Woman looking at the mirror with skincare product"
                  />
                  <img
                    loading="lazy"
                    className="w-full mb-4 aspect-[3/4] object-cover rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    src="https://i.imgur.com/fkKUjGX.jpg"
                    alt="Healthy skin serum skincare product"
                  />
                  <img
                    loading="lazy"
                    className="w-full mb-4 aspect-[3/4] object-cover rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    src="https://images.unsplash.com/photo-1526413425697-1d271fdbe7a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80"
                    alt="Woman back"
                  />
                  <img
                    loading="lazy"
                    className="w-full mb-4 aspect-[3/4] object-cover rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    src="https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80"
                    alt="Healthy skin The ordinary skincare product"
                  />
                  <img
                    loading="lazy"
                    className="w-full mb-4 aspect-[3/4] object-cover rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    src="https://i.imgur.com/XDE0KD9.jpg"
                    alt="Happy woman with healthy skin"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 h-40 w-40 bg-peach rounded-full blur-xl opacity-50 -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-beige">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-purple mb-4">Our Values</h2>
              <p className="text-purple/70">
                These core principles guide how we select brands and serve our customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
                <div className="mb-4 transform transition-transform group-hover:scale-105 duration-300">
                  <Shield className="h-10 w-10 text-gold" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-purple mb-3">
                  Authenticity
                </h3>
                <p className="text-purple/70">
                  We guarantee 100% authentic products directly from authorized manufacturers,
                  ensuring you receive genuine premium skincare.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
                <div className="mb-4 transform transition-transform group-hover:scale-105 duration-300">
                  <Star className="h-10 w-10 text-peach" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-purple mb-3">Curation</h3>
                <p className="text-purple/70">
                  We carefully select each brand and product in our catalog based on scientific
                  evidence, effectiveness, and customer feedback.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
                <div className="mb-4 transform transition-transform group-hover:scale-105 duration-300">
                  <Heart className="h-10 w-10 text-purple" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-purple mb-3">
                  Customer Care
                </h3>
                <p className="text-purple/70">
                  We provide expert guidance to help you find the right products for your unique
                  skin concerns and ensure your complete satisfaction.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
                <div className="mb-4 transform transition-transform group-hover:scale-105 duration-300">
                  <Leaf className="h-10 w-10 text-gold" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-purple mb-3">
                  Sustainability
                </h3>
                <p className="text-purple/70">
                  We prioritize brands that demonstrate environmental responsibility through ethical
                  sourcing and eco-friendly packaging.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
