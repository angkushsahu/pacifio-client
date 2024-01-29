"use client";

import Link from "next/link";

import type { ShoppingBagItemType } from "@root/validations";
import { Orders } from "@root/components/custom";
import { Button } from "@root/components/ui";
import { homeUrl } from "@root/constants";
import { useGetOrder } from "@root/hooks";
import Loading from "@root/app/loading";
import OrderInfo from "./orderInfo";

export interface ParentComponentProps {
   token: string;
   orderId: string;
}

export default function ParentComponent({ orderId, token }: ParentComponentProps) {
   const { data: response } = useGetOrder({ enabled: !!token, orderId, token });
   if (!response) return <Loading />;

   const { order } = response.data;

   const orderItems: Array<ShoppingBagItemType> = order.products.map((item) => ({
      itemPrice: item.itemPrice,
      quantity: item.quantity,
      product: {
         _id: item.productId,
         defaultImage: { publicUrl: "", secureUrl: item.image },
         name: item.name,
         price: item.price,
         stock: 0,
      },
   }));
   const orderDetails = { createdAt: order.createdAt, paymentInfo: order.paymentInfo, deliveryInfo: order.deliveryInfo };

   return (
      <main className="min-h-section center-layout px-5 py-8">
         <div className="mb-10">
            <h1 className="font-semibold text-3xl mb-6">Order Summary</h1>
            <OrderInfo address={order.address} order={orderDetails} />
         </div>
         <div>
            <h1 className="font-semibold text-2xl text-custom-foreground mb-6">Ordered Products</h1>
            <Orders order={orderItems} totalItems={order.products.length} totalPrice={order.totalPrice} />
         </div>
         <div className="mt-8 flex justify-end">
            <Link href={homeUrl} className="w-full sm:w-auto">
               <Button className="w-full">Continue shopping</Button>
            </Link>
         </div>
      </main>
   );
}
