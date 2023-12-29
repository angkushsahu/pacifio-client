import { formatNumber } from "@root/lib";

export interface ShoppingBagSummaryProps {
   totalItems: number;
   totalPrice: number;
}

export default function ShoppingBagSummary({ totalItems, totalPrice }: ShoppingBagSummaryProps) {
   return (
      <div className="flex items-center justify-between my-5">
         <p className="text-custom-foreground text-lg">
            {totalItems} item{totalItems > 1 ? "s" : ""}
         </p>
         <p className="text-xl font-semibold">₹ {formatNumber(totalPrice)}</p>
      </div>
   );
}
