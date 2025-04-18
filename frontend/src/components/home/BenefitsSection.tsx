import { BadgeCheck, Shield, Star, Truck } from "lucide-react";

const benefits = [
  {
    icon: <Shield className="h-10 w-10 text-gold" />,
    title: "100% Authentic Products",
    description:
      "We guarantee that all our products are authentic and sourced directly from authorized manufacturers of premium brands like The Ordinary.",
  },
  {
    icon: <Star className="h-10 w-10 text-peach" />,
    title: "Premium Brand Selection",
    description:
      "We carefully curate our collection to bring you the most effective and trusted dermocosmetic brands on the market.",
  },
  {
    icon: <Truck className="h-10 w-10 text-purple" />,
    title: "Fast & Reliable Shipping",
    description:
      "Enjoy quick delivery of your favorite skincare products with our efficient shipping services and real-time order tracking.",
  },
  {
    icon: <BadgeCheck className="h-10 w-10 text-gold" />,
    title: "Expert Product Guidance",
    description:
      "Our team provides personalized recommendations to help you find the right products from our premium brand catalog for your skin concerns.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-beige to-beige-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-4">
            Why Shop With Us
          </h2>
          <p className="text-purple/70 max-w-2xl mx-auto">
            As authorized distributors of The Ordinary and other premium skincare brands, we bring
            science-backed skincare solutions directly to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="mb-4 transform transition-transform group-hover:scale-105 duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-playfair font-semibold text-purple mb-3">
                {benefit.title}
              </h3>
              <p className="text-purple/70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
