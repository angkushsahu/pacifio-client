"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";

import type { ShoppingBagResponseType } from "@root/validations";
import { Button, Input, toast } from "@root/components/ui";
import { getShoppingBagQueryKey } from "@root/constants";
import { useAddToBag } from "@root/hooks";

export interface UpdateQuantityProps {
   productId: string;
   quantity: number;
   stock: number;
   token: string;
}

export default function UpdateQuantity({ productId, quantity, stock, token }: UpdateQuantityProps) {
   const queryClient = useQueryClient();
   let debounceTime = useRef<NodeJS.Timeout | null>(null);
   const [quantityValue, setQuantityValue] = useState(quantity);

   function onSuccess(data: ShoppingBagResponseType) {
      queryClient.setQueryData([getShoppingBagQueryKey], () => data);
      toast({ title: data.message });
   }
   const { mutate: addToBagMutation, isPending } = useAddToBag({ onSuccess });

   function updateQuantity(currentQuantity: number) {
      if (currentQuantity < 1 || currentQuantity > stock) return;
      setQuantityValue(currentQuantity);

      if (debounceTime.current) clearTimeout(debounceTime.current);
      debounceTime.current = setTimeout(() => {
         addToBagMutation({ token, values: { productId, quantity: currentQuantity } });
      }, 1000);
   }

   useEffect(() => {
      return () => {
         if (debounceTime.current) clearTimeout(debounceTime.current);
      };
   }, []);

   return (
      <div className="my-4 w-40 flex items-center">
         {quantityValue > 1 ? (
            <Button
               className="h-8 p-3 bg-custom-marker hover:bg-custom-hover"
               onClick={() => updateQuantity(quantityValue - 1)}
               disabled={isPending}
            >
               <Minus className="w-3 h-3 text-black" />
            </Button>
         ) : null}
         <Input
            className="h-8 text-center disabled:opacity-100"
            value={quantityValue}
            onChange={(e) => updateQuantity(Number(e.target.value))}
            disabled
         />
         {quantityValue < stock ? (
            <Button
               className="h-8 p-3 bg-custom-marker hover:bg-custom-hover"
               onClick={() => updateQuantity(quantityValue + 1)}
               disabled={isPending}
            >
               <Plus className="w-3 h-3 text-black" />
            </Button>
         ) : null}
      </div>
   );
}
