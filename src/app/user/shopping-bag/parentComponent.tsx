"use client";

import Link from "next/link";

import { homeUrl, shippingUrl } from "@root/constants";
import ShoppingBagSummary from "./shoppingBagSummary";
import EmptyShoppingBag from "./emptyShoppingBag";
import ShoppingBagItem from "./shoppingBagItem";
import { Button } from "@root/components/ui";
import { useGetBag } from "@root/hooks";
import Loading from "./loading";

export default function ParentComponent({ token }: { token: string }) {
   const { data: response } = useGetBag({ enabled: !!token, token });
   if (!response) return <Loading />;
   const { products, totalPrice, totalProducts } = response.data.shoppingBag;

   if (!response.data.shoppingBag.products.length) return <EmptyShoppingBag />;

   return (
      <main className="min-h-section center-layout px-5 py-8">
         <h1 className="font-semibold text-3xl mb-6">Shopping Bag</h1>
         <ShoppingBagSummary totalItems={totalProducts} totalPrice={totalPrice} />
         <section className="border-y-[1px] border-custom-light divide-y-[1px] divide-custom-light">
            {products.map(({ itemPrice, product, quantity }, idx) => {
               const { _id: productId, defaultImage, ...item } = product;
               return (
                  <ShoppingBagItem
                     {...item}
                     image={defaultImage.secureUrl}
                     productId={productId}
                     quantity={quantity}
                     totalPricePerItem={itemPrice}
                     token={token}
                     productIdx={idx + 1}
                     key={`shoppingBag-item-${idx + 1}`}
                  />
               );
            })}
         </section>
         <ShoppingBagSummary totalItems={totalProducts} totalPrice={totalPrice} />
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
