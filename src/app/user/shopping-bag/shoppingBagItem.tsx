import Image from "next/image";
import Link from "next/link";

import { formatNumber, getCardBackgroundColor, shortenSentence } from "@root/lib";
import { baseProductUrl } from "@root/constants";
import ConfirmDeletion from "./confirmDeletion";
import UpdateQuantity from "./updateQuantity";

export interface ShoppingBagItemProps {
   productId: string;
   productIdx: number;
   image: string;
   name: string;
   price: number;
   stock: number;
   quantity: number;
   totalPricePerItem: number;
   token: string;
}

export default function ShoppingBagItem(props: ShoppingBagItemProps) {
   const { productId, productIdx, image, price, quantity, stock, name, token, totalPricePerItem } = props;
   let { isLong, shortenedString } = shortenSentence({ maxCharacters: 40, sentence: name });
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
                  <Image src={image} alt={name} width="200" height="160" />
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
               <p className="mt-2">₹ {formatNumber(price)} per item</p>
               <UpdateQuantity productId={productId} quantity={quantity} stock={stock} token={token} />
            </div>
            {/* product name, price per item, quantity -- end */}
            {/* totalPrice and delete item -- start */}
            <div className="flex flex-col justify-between">
               <p className="text-xl font-semibold mb-2">₹ {formatNumber(totalPricePerItem)}</p>
               <ConfirmDeletion token={token} productId={productId} />
            </div>
         </section>
         {/* totalPrice and delete item -- end */}
      </article>
   );
}
