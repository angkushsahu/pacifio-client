import type { Dispatch, SetStateAction } from "react";
import Slider from "react-slider";

import { formatNumber } from "@root/lib";

export interface SliderComponentProps {
   values: [number, number];
   setValues: Dispatch<SetStateAction<[number, number]>>;
   MIN: number;
   MAX: number;
   isPrice?: boolean;
}

export default function SliderComponent({ isPrice = false, MAX, MIN, setValues, values }: SliderComponentProps) {
   return (
      <div>
         <Slider
            onChange={(value: [number, number]) => setValues(value)}
            value={values}
            min={MIN}
            max={MAX}
            className="slider w-full h-1 bg-custom-marker my-4"
         />
         {isPrice ? (
            <p>
               ₹ {formatNumber(values[0])} - ₹ {formatNumber(values[1])}
            </p>
         ) : (
            <p>
               {values[0]} - {values[1]}
            </p>
         )}
      </div>
   );
}
