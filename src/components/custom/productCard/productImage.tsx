import Image from "next/image";

import { getCardBackgroundColor } from "@root/lib";

export interface ProductImageProps {
   productIdx?: number | null;
   imageUrl?: string;
   productTitle: string;
}

export default function ProductImage({ productIdx, productTitle, imageUrl }: ProductImageProps) {
   return (
      <div className="h-80 flex items-center justify-center" style={{ backgroundColor: getCardBackgroundColor(productIdx) }}>
         {imageUrl ? (
            <Image src={imageUrl} alt={productTitle} width={300} height={300} placeholder="empty" />
         ) : (
            <p className="font-bold text-2xl text-custom-foreground">NO IMAGE</p>
         )}
      </div>
   );
}
