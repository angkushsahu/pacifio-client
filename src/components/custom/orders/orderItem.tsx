import Image from "next/image";
import Link from "next/link";

import { formatNumber, getCardBackgroundColor, shortenSentence } from "@root/lib";
import type { ShoppingBagItemType } from "@root/validations";
import { baseProductUrl } from "@root/constants";

export default function OrderItem(props: ShoppingBagItemType & { productIdx: number }) {
   const { itemPrice, product, quantity, productIdx } = props;
   const { _id, defaultImage, name, price } = product;
   let { isLong, shortenedString } = shortenSentence({ maxCharacters: 40, sentence: name });
   shortenedString += isLong ? " ...." : "";

   const linkToProduct = `${baseProductUrl}/${_id}`;

   return (
      <article className="py-5 flex flex-col sm:flex-row gap-x-5">
         {/* product image -- start */}
         <Link href={linkToProduct}>
            <div
               className="sm:w-60 h-48 flex items-center justify-center"
               style={{ backgroundColor: getCardBackgroundColor(productIdx) }}
            >
               {defaultImage.secureUrl ? (
                  <Image src={defaultImage.secureUrl} alt={name} width="200" height="160" />
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
            <p className="mt-4 sm:mt-0 text-xl font-semibold">₹ {formatNumber(itemPrice)}</p>
         </section>
         {/* totalPrice -- end */}
      </article>
   );
}
