"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Button, Input } from "@root/components/ui";

export interface UpdateQuantityProps {
   quantity: number;
   stock: number;
}

export default function UpdateQuantity({ quantity, stock }: UpdateQuantityProps) {
   const [quantityValue, setQuantityValue] = useState(quantity);

   return (
      <div className="my-4 w-40 flex items-center">
         {quantityValue > 1 ? (
            <Button
               className="h-8 p-3 bg-custom-marker hover:bg-custom-hover"
               onClick={() => setQuantityValue((prev) => prev - 1)}
            >
               <Minus className="w-3 h-3 text-black" />
            </Button>
         ) : null}
         <Input
            className="h-8 text-center disabled:opacity-100"
            value={quantityValue}
            onChange={(e) => setQuantityValue(Number(e.target.value))}
            disabled
         />
         {quantityValue < stock ? (
            <Button
               className="h-8 p-3 bg-custom-marker hover:bg-custom-hover"
               onClick={() => setQuantityValue((prev) => prev + 1)}
            >
               <Plus className="w-3 h-3 text-black" />
            </Button>
         ) : null}
      </div>
   );
}
