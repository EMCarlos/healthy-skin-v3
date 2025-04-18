import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  image: string;
  rating: number;
  text: string;
  date: string;
}

const TestimonialCard = ({ name, image, rating, text, date }: TestimonialCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full border-beige border border-solid">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={image}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "text-gold fill-gold" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic mb-3">"{text}"</p>
      <p className="text-sm text-gray-400">{date}</p>
    </div>
  );
};

export default TestimonialCard;
