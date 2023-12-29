import { formatNumber } from "@root/lib";

export interface CartSummaryProps {
   totalItems: number;
   totalPrice: number;
}

export default function CartSummary({ totalItems, totalPrice }: CartSummaryProps) {
   return (
      <div className="flex items-center justify-between my-5">
         <p className="text-custom-foreground text-lg">
            {totalItems} item{totalItems > 1 ? "s" : ""}
         </p>
         <p className="text-xl font-semibold">₹ {formatNumber(totalPrice)}</p>
      </div>
   );
}
