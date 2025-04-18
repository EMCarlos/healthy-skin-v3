import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TestimonialCard from "../TestimonialCard";

// Sample testimonial data
const testimonials = [
  {
    name: "Emily Johnson",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "The Hydra Boost Serum completely transformed my skin! I've struggled with dryness for years, and within weeks my skin felt plump and hydrated.",
    date: "March 15, 2023",
  },
  {
    name: "Michael Chen",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    rating: 4,
    text: "I was skeptical about skincare products, but the Gentle Exfoliating Cleanser changed my mind. My skin feels clean without that tight, dry feeling.",
    date: "April 3, 2023",
  },
  {
    name: "Sarah Williams",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5,
    text: "After turning 40, I noticed more fine lines. The Nourishing Night Treatment has visibly reduced them and improved my skin's texture.",
    date: "February 22, 2023",
  },
  {
    name: "David Martinez",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    text: "The Vitamin C Brightening Cream evened out my skin tone and reduced dark spots from sun damage. Great product!",
    date: "May 10, 2023",
  },
  {
    name: "Lisa Thompson",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 4,
    text: "I love that these products are effective yet gentle. My sensitive skin hasn't had any reactions, which is rare for me.",
    date: "January 8, 2023",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.round(testimonials.length / 4) - 1;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      handleNext();
    }
    if (touchEndX.current - touchStartX.current > 75) {
      handlePrev();
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-4">
            What Our Customers Say
          </h2>
          <p className="text-purple/70 max-w-2xl mx-auto">
            Discover how our products have transformed skincare routines and helped our customers
            achieve their best skin ever.
          </p>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${Math.ceil(testimonials.length / 3) * 100}%`,
              }}
            >
              {[0, 1, 2].map((columnIndex) => (
                <div
                  key={columnIndex}
                  className="w-full px-4"
                >
                  <div className="grid grid-cols-1 gap-6">
                    {testimonials
                      .filter((_, index) => index % 3 === columnIndex)
                      .map((testimonial, index) => (
                        <TestimonialCard
                          key={index}
                          {...testimonial}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-beige"
            }`}
          >
            <ChevronLeft className="h-6 w-6 text-purple" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 ${
              currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : "hover:bg-beige"
            }`}
          >
            <ChevronRight className="h-6 w-6 text-purple" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentIndex === index ? "bg-purple w-6" : "bg-gray-300 hover:bg-purple/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
