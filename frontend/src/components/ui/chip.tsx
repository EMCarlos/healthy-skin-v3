import { ButtonHTMLAttributes } from "react";

type Props = {
  category?: string;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

function Chip({
  category,
  activeCategory,
  setActiveCategory,
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={() => category && setActiveCategory(category)}
      className={`px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap ${
        activeCategory === category
          ? "bg-purple text-white"
          : "bg-beige text-purple hover:bg-purple/10"
      }`}
      {...props}
    >
      {category}
    </button>
  );
}

export { Chip };
