import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { paymentUrl, shippingUrl, shoppingBagUrl } from "@root/constants/routes";
import { Orders } from "@root/components/elements";
import type { ServerPageProps } from "@root/types";
import { Button } from "@root/components/ui";

export const metadata: Metadata = {
   title: "Confirm your order - Pacifio",
};

const orderItem = {
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

export default function ConfirmOrder({ searchParams }: ServerPageProps) {
   if (!searchParams.shipping_id) redirect(shoppingBagUrl);

   return (
      <main className="min-h-section center-layout px-5 py-8">
         <h1 className="font-semibold text-3xl mb-6">Confirm your order</h1>
         <Orders orderItem={orderItem} />
         <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-y-3">
            <Link href={shippingUrl} className="text-custom-foreground order-1 sm:order-none underline underline-offset-4">
               Back to shipping
            </Link>
            <Link href={paymentUrl} className="w-full sm:w-auto">
               <Button className="w-full">Proceed to pay</Button>
            </Link>
         </div>
      </main>
   );
}
