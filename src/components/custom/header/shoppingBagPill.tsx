"use client";

import { useGetBag } from "@root/hooks";

export default function ShoppingBagPill({ token }: { token: string }) {
   const { data } = useGetBag({ enabled: !!token, token });
   if (!data) return null;
   const { totalProducts } = data.data.shoppingBag;
   if (!totalProducts) return null;

   return (
      <div className="bg-neutral-300 font-bold p-1 text-xs rounded-full border-2 border-white absolute w-7 h-7 flex items-center justify-center -top-3 -right-3">
         {totalProducts}
      </div>
   );
}
