import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 5, totalStars = 5, size = "w-4 h-4", interactive = false, onRatingChange }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;

        return (
          <Star
            key={i}
            className={`${size} transition-colors ${
              isFilled
                ? 'text-amber-400 fill-amber-400'
                : 'text-slate-300 dark:text-slate-700'
            } ${interactive ? 'cursor-pointer hover:scale-110' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
