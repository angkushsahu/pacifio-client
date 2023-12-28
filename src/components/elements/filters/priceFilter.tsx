"use client";

import type { Dispatch, SetStateAction } from "react";
import SliderComponent from "./slider";

export interface PriceFilterProps {
   MIN_PRICE: number;
   MAX_PRICE: number;
   priceRange: [number, number];
   setPriceRange: Dispatch<SetStateAction<[number, number]>>;
}

export default function PriceFilter({ MAX_PRICE, MIN_PRICE, priceRange, setPriceRange }: PriceFilterProps) {
   return (
      <div>
         <p className="font-medium text-lg">Price</p>
         <SliderComponent values={priceRange} MAX={MAX_PRICE} MIN={MIN_PRICE} setValues={setPriceRange} />
      </div>
   );
}
