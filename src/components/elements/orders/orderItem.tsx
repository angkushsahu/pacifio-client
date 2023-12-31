import Image from "next/image";
import Link from "next/link";

import { formatNumber, getCardBackgroundColor, shortenSentence } from "@root/lib";
import { baseProductUrl } from "@root/constants/routes";

export interface OrderItemProps {
   productId: string;
   productIdx: number;
   image: string;
   title: string;
   price: number;
   stock: number;
   quantity: number;
   totalPricePerItem: number;
}

export default function OrderItem(props: OrderItemProps) {
   const { productId, productIdx, image, price, quantity, stock, title, totalPricePerItem } = props;
   let { isLong, shortenedString } = shortenSentence({ maxCharacters: 40, sentence: title });
   shortenedString += isLong ? " ...." : "";

   const linkToProduct = `${baseProductUrl}/${productId}`;

   return (
      <article className="py-5 flex flex-col sm:flex-row gap-x-5">
         {/* product image -- start */}
         <Link href={linkToProduct}>
            <div
               className="sm:w-60 h-48 flex items-center justify-center"
               style={{ backgroundColor: getCardBackgroundColor(productIdx) }}
            >
               {image ? (
                  <Image src={image} alt={title} width="200" height="160" />
               ) : (
                  <p className="font-bold text-2xl text-custom-foreground">NO IMAGE</p>
               )}
            </div>
         </Link>
         {/* product image -- end */}
         {/* product name, price per item, quantity -- start */}
         <section className="flex-1 flex flex-col lg:flex-row gap-x-5">
            <div className="flex-1 mt-4 sm:mt-0">
               <Link href={linkToProduct} className="text-lg font-semibold">
                  {shortenedString}
               </Link>
               <p className="my-2">₹ {formatNumber(price)} per item</p>
               <p>Quantity: {quantity}</p>
            </div>
            {/* product name, price per item, quantity -- end */}
            {/* totalPrice -- start */}
            <p className="mt-4 sm:mt-0 text-xl font-semibold">₹ {formatNumber(totalPricePerItem)}</p>
         </section>
         {/* totalPrice -- end */}
      </article>
   );
}
