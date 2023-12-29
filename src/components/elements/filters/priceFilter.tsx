"use client";

import SliderComponent from "./slider";

export interface PriceFilterProps {
   MIN_PRICE: number;
   MAX_PRICE: number;
   priceRange: [number, number];
   updatePriceRange: (value: [number, number]) => void;
}

export default function PriceFilter({ MAX_PRICE, MIN_PRICE, priceRange, updatePriceRange }: PriceFilterProps) {
   return (
      <div>
         <p className="font-medium text-lg">Price</p>
         <SliderComponent values={priceRange} MAX={MAX_PRICE} MIN={MIN_PRICE} setValues={updatePriceRange} />
      </div>
   );
}
