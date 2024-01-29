"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { basePaymentUrl, shippingUrl, shoppingBagUrl } from "@root/constants";
import type { IsAddressAvailableProps } from "./isAddressAvailable";
import { Orders } from "@root/components/custom";
import { Button } from "@root/components/ui";
import { useGetBag } from "@root/hooks";
import Loading from "./loading";

export default function ParentComponent({ enabled, shippingId, token }: IsAddressAvailableProps & { enabled: boolean }) {
   const router = useRouter();

   const { data: response } = useGetBag({ enabled, token });
   if (!response) return <Loading />;
   const { products, totalPrice, totalProducts } = response.data.shoppingBag;
   if (!totalProducts) router.replace(shoppingBagUrl);

   return (
      <main className="min-h-section center-layout px-5 py-8">
         <h1 className="font-semibold text-3xl mb-6">Confirm your order</h1>
         <Orders order={products} totalPrice={totalPrice} totalItems={totalProducts} />
         <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-y-3">
            <Link
               href={`${shippingUrl}?shipping_id=${shippingId}`}
               className="text-custom-foreground order-1 sm:order-none underline underline-offset-4"
            >
               Back to shipping
            </Link>
            <Link href={`${basePaymentUrl}?shipping_id=${shippingId}`} className="w-full sm:w-auto">
               <Button className="w-full">Proceed to pay</Button>
            </Link>
         </div>
      </main>
   );
}
