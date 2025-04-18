import skincareWomanVideo from "@/assets/skincare-woman.mp4";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-light to-beige min-h-[80vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold leading-tight text-purple-dark mb-4 animate-[fade-in_0.6s_ease-out]">
              Premium Brands,
              <br />
              <span className="text-gold-dark animate-[fade-in_0.8s_ease-out]">
                One Destination
              </span>
            </h1>
            <p className="text-lg md:text-xl text-purple-dark/90 mb-8 max-w-lg animate-[fade-in_1s_ease-out]">
              Discover our curated collection of premium skincare brands including The Ordinary, all
              in one place at guaranteed authentic prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-[fade-in_1.2s_ease-out]">
              <Link
                to="/products"
                className="btn-primary bg-purple-dark text-white rounded-full flex items-center justify-center space-x-2 px-8 py-3 hover:bg-purple-dark/90 transition-colors shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-transform duration-300"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5 animate-pulse" />
              </Link>
              <Link
                to="/about"
                className="btn-outline text-purple-dark border-purple-dark rounded-full px-8 text-center hover:bg-purple/10 transition-colors hover:translate-y-[-2px] transition-transform duration-300"
              >
                Our Brands
              </Link>
            </div>
          </div>
          <div className="relative animate-[fade-in_1s_ease-out]">
            <div className="relative h-[300px] md:h-[600px] w-full overflow-hidden rounded-none md:rounded-bl-[100px] md:rounded-tr-[100px] shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.02] transition-transform duration-500 max-md:scale-x-[1.09]">
              <video
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                playsInline
                autoPlay
                muted
                loop
                controls={false}
              >
                <source
                  src={skincareWomanVideo}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-purple-dark/5 hover:bg-purple-dark/10 transition-colors duration-300"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-40 w-40 bg-peach-dark rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute -top-6 -right-6 h-40 w-40 bg-gold rounded-full blur-xl opacity-30 animate-pulse"></div>

            {/* Floating decorative elements */}
            <div className="absolute top-10 right-10 h-16 w-16 bg-white rounded-full shadow-lg opacity-80 animate-[bounce_4s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-20 left-10 h-10 w-10 bg-gold-dark/60 rounded-full shadow-md animate-[bounce_5s_ease-in-out_infinite_0.5s]"></div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-peach/20 to-transparent hidden md:block"></div>
    </section>
  );
};

export default HeroSection;
