import Link from "next/link";

import { homeUrl, shippingUrl } from "@root/constants/routes";
import ShoppingBagSummary from "./shoppingBagSummary";
import EmptyShoppingBag from "./emptyShoppingBag";
import ShoppingBagItem from "./shoppingBagItem";
import { Button } from "@root/components/ui";

const shoppingBagItem = {
   totalItems: 5,
   totalPrice: 2300,
   image: "https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-keyboard_jpsbah.png",
   title: "KUMARA K552 - TKL WIRED MECHNICAL KEYBAORD RAINBOW (RED SWITCH)",
   price: 2550,
   productId: "something",
   stock: 5,
   quantity: 3,
   totalPricePerItem: 6900,
};

export default function ShoppingBagParent() {
   const isShoppingBagEmpty = false;

   if (isShoppingBagEmpty) return <EmptyShoppingBag />;

   return (
      <main className="min-h-section center-layout px-5 py-8">
         <h1 className="font-semibold text-3xl mb-6">Shopping Bag</h1>
         <ShoppingBagSummary totalItems={shoppingBagItem.totalItems} totalPrice={shoppingBagItem.totalPrice} />
         <section className="border-y-[1px] border-custom-light divide-y-[1px] divide-custom-light">
            {Array.from({ length: 5 }).map((_, idx) => (
               <ShoppingBagItem {...shoppingBagItem} productIdx={idx + 1} key={`shoppingBag-item-${idx + 1}`} />
            ))}
         </section>
         <ShoppingBagSummary totalItems={shoppingBagItem.totalItems} totalPrice={shoppingBagItem.totalPrice} />
         <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-y-3">
            <Link href={homeUrl} className="text-custom-foreground order-1 sm:order-none underline underline-offset-4">
               Continue shopping
            </Link>
            <Link href={shippingUrl} className="w-full sm:w-auto">
               <Button className="w-full">Checkout</Button>
            </Link>
         </div>
      </main>
   );
}
