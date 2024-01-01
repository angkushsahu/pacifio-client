"use client";

import SliderComponent from "./slider";

export interface RatingFilterProps {
   MIN_RATING: number;
   MAX_RATING: number;
   ratingRange: [number, number];
   updateRatingRange: (value: [number, number]) => void;
}

export default function RatingFilter({ MAX_RATING, MIN_RATING, ratingRange, updateRatingRange }: RatingFilterProps) {
   return (
      <div>
         <p className="font-medium text-lg">Ratings</p>
         <SliderComponent values={ratingRange} MAX={MAX_RATING} MIN={MIN_RATING} setValues={updateRatingRange} />
      </div>
   );
}
