"use client";

import type { Dispatch, SetStateAction } from "react";
import SliderComponent from "./slider";

export interface RatingFilterProps {
   MIN_RATING: number;
   MAX_RATING: number;
   ratingRange: [number, number];
   setRatingRange: Dispatch<SetStateAction<[number, number]>>;
}

export default function RatingFilter({ MAX_RATING, MIN_RATING, ratingRange, setRatingRange }: RatingFilterProps) {
   return (
      <div>
         <p className="font-medium text-lg">Ratings</p>
         <SliderComponent values={ratingRange} MAX={MAX_RATING} MIN={MIN_RATING} setValues={setRatingRange} />
      </div>
   );
}
