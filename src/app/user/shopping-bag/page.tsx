import type { Metadata } from "next";
import Link from "next/link";

import { homeUrl, shippingUrl } from "@root/constants/routes";
import { Button } from "@root/components/ui";
import CartSummary from "./cartSummary";
import CartItem from "./cartItem";

export const metadata: Metadata = {
   title: "Your shopping bag - Pacifio",
};

const cartItem = {
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

export default function ShoppingBag() {
   return (
      <main className="min-h-section center-layout px-5 py-8">
         <h1 className="font-semibold text-3xl mb-6">Shopping Bag</h1>
         <CartSummary totalItems={cartItem.totalItems} totalPrice={cartItem.totalPrice} />
         <section className="border-y-[1px] border-custom-light divide-y-[1px] divide-custom-light">
            {Array.from({ length: 5 }).map((_, idx) => (
               <CartItem {...cartItem} productIdx={idx + 1} key={`cart-item-${idx + 1}`} />
            ))}
         </section>
         <CartSummary totalItems={cartItem.totalItems} totalPrice={cartItem.totalPrice} />
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
