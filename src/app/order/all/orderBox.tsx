import Link from "next/link";

import { OrderStatus, PaymentStatus } from "@root/components/custom";
import type { OrderType } from "@root/validations";
import { viewOrderUrl } from "@root/constants";
import { shortenSentence } from "@root/lib";

export default function OrderBox(order: OrderType) {
   return (
      <article className="bg-custom hover:bg-custom-hover p-5 shadow-md">
         <p className="font-semibold text-lg mb-4">{order.createdAt}</p>
         <ul>
            {order.products.slice(0, 4).map((item, idx) => {
               let { isLong, shortenedString } = shortenSentence({ sentence: item.name, maxCharacters: 35 });
               shortenedString += isLong ? " ...." : "";

               return (
                  <li key={`Item ${idx + 1}`} className="my-2 list-disc list-inside">
                     {shortenedString}
                  </li>
               );
            })}
            {order.products.length > 4 ? (
               <p className="mt-3 mb-4 text-custom-foreground">+ {order.products.length - 4} more items</p>
            ) : null}
         </ul>
         <div>
            <PaymentStatus status={order.paymentInfo.status} />
         </div>
         <div className="flex items-center gap-x-2 my-3">
            <OrderStatus status={order.deliveryInfo?.status || "processing"} />
            {order.deliveryInfo?.status === "delivered" ? (
               <span className="text-sm text-custom-foreground"> on {order.deliveryInfo?.time}</span>
            ) : null}
         </div>
         <div className="flex justify-end mt-2">
            <Link href={`${viewOrderUrl}/${order.id}`} className="underline underline-offset-4 text-sm font-custom-foreground">
               Know more ....
            </Link>
         </div>
      </article>
   );
}
