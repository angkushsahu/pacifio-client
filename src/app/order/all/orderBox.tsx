import Link from "next/link";

import { OrderStatus, PaymentStatus } from "@root/components/custom";
import { viewOrderUrl } from "@root/constants/routes";
import { shortenSentence } from "@root/lib";

const order = {
   orderId: "something",
   orderedOn: "26th July, 2023",
   deliveredOn: "29th September, 2023",
   paymentStatus: "not-paid",
   deliveryStatus: "delivered",
   items: [
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima nobis, atque vel qui nulla facilis sapiente placeat, repellat fugit ducimus aperiam modi! Magni soluta maiores nemo dicta eligendi aut dolorum.",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima nobis, atque vel qui nulla facilis sapiente placeat, repellat fugit ducimus aperiam modi! Magni soluta maiores nemo dicta eligendi aut dolorum.",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima nobis, atque vel qui nulla facilis sapiente placeat, repellat fugit ducimus aperiam modi! Magni soluta maiores nemo dicta eligendi aut dolorum.",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima nobis, atque vel qui nulla facilis sapiente placeat, repellat fugit ducimus aperiam modi! Magni soluta maiores nemo dicta eligendi aut dolorum.",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima nobis, atque vel qui nulla facilis sapiente placeat, repellat fugit ducimus aperiam modi! Magni soluta maiores nemo dicta eligendi aut dolorum.",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima nobis, atque vel qui nulla facilis sapiente placeat, repellat fugit ducimus aperiam modi! Magni soluta maiores nemo dicta eligendi aut dolorum.",
   ],
};

export default function OrderBox() {
   return (
      <article className="bg-custom hover:bg-custom-hover p-5 shadow-md">
         <p className="font-semibold text-lg mb-4">{order.orderedOn}</p>
         <ul>
            {order.items.slice(0, 4).map((item, idx) => {
               let { isLong, shortenedString } = shortenSentence({ sentence: item, maxCharacters: 35 });
               shortenedString += isLong ? " ...." : "";

               return (
                  <li key={`Item ${idx + 1}`} className="my-2 list-disc list-inside">
                     {shortenedString}
                  </li>
               );
            })}
            {order.items.length > 4 ? (
               <p className="mt-3 mb-4 text-custom-foreground">+ {order.items.length - 4} more items</p>
            ) : null}
         </ul>
         <div>
            <PaymentStatus status="paid" />
         </div>
         <div className="flex items-center gap-x-2 my-3">
            <OrderStatus status="delivered" />
            {order.deliveryStatus === "delivered" ? (
               <span className="text-sm text-custom-foreground"> on {order.deliveredOn}</span>
            ) : null}
         </div>
         <div className="flex justify-end mt-2">
            <Link
               href={`${viewOrderUrl}/${order.orderId}`}
               className="underline underline-offset-4 text-sm font-custom-foreground"
            >
               Know more ....
            </Link>
         </div>
      </article>
   );
}
