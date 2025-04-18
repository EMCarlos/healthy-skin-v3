
import { Skeleton } from "./ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      {/* Image skeleton */}
      <Skeleton className="h-64 w-full" />
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Category skeleton */}
        <Skeleton className="h-4 w-20 mb-1" />
        
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4 mb-1" />
        
        {/* Rating skeleton */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-4" />
          ))}
          <Skeleton className="h-4 w-8 ml-1" />
        </div>
        
        {/* Price skeleton */}
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
