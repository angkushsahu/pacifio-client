import Image from "next/image";

export interface ProductImageProps {
   productIdx?: number | null;
   imageUrl?: string;
   productTitle: string;
}

function getBackground(num: number | null | undefined): string {
   if (!num) return "#c0dae9";
   if (num % 4 == 0) return "#2b2b2b";
   if (num % 3 == 0) return "#ffe5e9";
   if (num % 2 == 0) return "#efebec";
   return "#c0dae9";
}

export default function ProductImage({ productIdx, productTitle, imageUrl }: ProductImageProps) {
   if (!imageUrl) {
      return (
         <div className="h-80 flex items-center justify-center" style={{ backgroundColor: getBackground(productIdx) }}>
            <p className="font-bold text-2xl text-custom-foreground">NO IMAGE</p>
         </div>
      );
   }

   return (
      <div className="h-80 flex items-center justify-center" style={{ backgroundColor: getBackground(productIdx) }}>
         <Image src={imageUrl} alt={productTitle} width={300} height={300} placeholder="empty" />
      </div>
   );
}
