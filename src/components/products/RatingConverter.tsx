import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface RatingConverterProps {
  ratingCount: number;
}

const RatingConverter = ({ ratingCount }: RatingConverterProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4",
            index < ratingCount
              ? "fill-yellow-400 text-yellow-400"
              : "fill-none text-gray-400",
          )}
        />
      ))}
      {/* <span className="ps-2 text-sm font-medium text-gray-400">
        {ratingCount}/5
      </span> */}
    </div>
  );
};

export default RatingConverter;
