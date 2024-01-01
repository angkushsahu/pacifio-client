import type { Metadata } from "next";
import Link from "next/link";

import { Orders } from "@root/components/custom";
import { homeUrl } from "@root/constants/routes";
import { Button } from "@root/components/ui";
import OrderInfo from "./orderInfo";

export const metadata: Metadata = {
   title: "Order Summary - Pacifio",
};

const orderSummary = {
   orderId: "something",
   address: {
      contact: "8876690064",
      location: "In front of SBI e-corner New Delhi Hawaii Japan",
      city: "Jammu and Kashmir",
      state: "Arunachal Pradesh",
      pincode: 785001,
      country: "India",
   },
   order: {
      orderedOn: "26th July, 2023",
      deliveredOn: "29th September, 2023",
      totalItems: 5,
      totalPrice: 2300,
      image: "https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-keyboard_jpsbah.png",
      title: "KUMARA K552 - TKL WIRED MECHNICAL KEYBAORD RAINBOW (RED SWITCH)",
      price: 2550,
      productId: "something",
      stock: 5,
      quantity: 3,
      totalPricePerItem: 6900,
      paymentStatus: "not-paid",
      deliveryStatus: "delivered",
   },
};

export default function ViewOrder() {
   return (
      <main className="min-h-section center-layout px-5 py-8">
         <div className="mb-10">
            <h1 className="font-semibold text-3xl mb-6">Order Summary</h1>
            <OrderInfo address={orderSummary.address} order={orderSummary.order} />
         </div>
         <div>
            <h1 className="font-semibold text-2xl text-custom-foreground mb-6">Ordered Products</h1>
            <Orders orderItem={orderSummary.order} />
         </div>
         <div className="mt-8 flex justify-end">
            <Link href={homeUrl} className="w-full sm:w-auto">
               <Button className="w-full">Continue shopping</Button>
            </Link>
         </div>
      </main>
   );
}
