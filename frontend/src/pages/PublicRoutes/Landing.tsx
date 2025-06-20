import Footer from "@/components/Footer";
import BenefitsSection from "@/components/home/BenefitsSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroSection from "@/components/home/HeroSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Navbar from "@/components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        <BenefitsSection />
        <TestimonialsSection />
        {/* <NewsletterSection /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
