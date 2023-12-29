import Link from "next/link";

import { formatNumber, shortenSentence } from "@root/lib";
import ProductImage from "./productImage";
import { ProductStockBadge } from "..";

export interface ProductCardProps {
   productId: string;
   title: string;
   price: number;
   inStock: boolean;
   rating: number;
   maxRating: number;
   reviews: number;
   image?: string;
   link?: string;
   idx?: number;
}

export default function ProductCard(product: ProductCardProps) {
   let { isLong, shortenedString } = shortenSentence({ maxCharacters: 33, sentence: product.title });
   shortenedString += isLong ? " ...." : "";

   const productImage = <ProductImage productIdx={product.idx} productTitle={product.title} imageUrl={product.image} />;

   return (
      <article>
         <div>{product.link ? <Link href={product.link}>{productImage}</Link> : productImage}</div>
         <p className="text-lg font-semibold mt-5 mb-2">
            {product.link ? <Link href={product.link}>{shortenedString}</Link> : shortenedString}
         </p>
         <div className="flex text-custom-foreground">
            <div className="flex-1">
               <p className="text-lg font-semibold">₹ {formatNumber(product.price)}</p>
               <ProductStockBadge inStock={product.inStock} />
            </div>
            <div className="flex-1 text-right">
               <p className="font-semibold">
                  {product.rating} / {product.maxRating}
               </p>
               <p>
                  {formatNumber(product.reviews)} review{product.reviews > 1 ? "s" : ""}
               </p>
            </div>
         </div>
      </article>
   );
}
