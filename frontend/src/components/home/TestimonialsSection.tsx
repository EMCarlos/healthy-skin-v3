import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

        <div className="relative px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full">
                    <TestimonialCard {...testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 md:-left-8" />
              <CarouselNext className="-right-12 md:-right-8" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
