"use client";

import Image from "next/image";

import { Badge, ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@root/components/ui";
import type { ProductImageType } from "@root/validations";
import Loading from "@root/app/admin/(routes)/loading";
import { useGetProduct } from "@root/hooks";
import DeleteImage from "./deleteImage";
import SetDefault from "./setDefault";

export interface ParentComponentProps {
   productId: string;
   token: string;
}

export interface ChildProps extends ProductImageType {
   token: string;
   productId: string;
}

export default function ParentComponent({ productId, token }: ParentComponentProps) {
   const { data: response } = useGetProduct({ enabled: true, id: productId });
   if (!response) return <Loading />;
   const { product } = response.data;

   const matchDefaultImage = ({ publicUrl, secureUrl }: ProductImageType) =>
      publicUrl === product.defaultImage.publicUrl && secureUrl === product.defaultImage.secureUrl;

   return (
      <section className="pt-4">
         <h1 className="font-semibold text-3xl">Select Default Image</h1>
         <p className="mb-8 mt-2">Right click or long press for more options</p>
         {!product.images.length ? (
            <p className="text-center text-muted-foreground">There are no images currently</p>
         ) : (
            <div className="mb-8 flex flex-wrap gap-6">
               {product.images.map(({ publicUrl, secureUrl }) => (
                  <ContextMenu key={publicUrl}>
                     <ContextMenuTrigger className="relative">
                        <Image src={secureUrl} alt={publicUrl} width={260} height={260} />
                        {matchDefaultImage({ publicUrl, secureUrl }) ? (
                           <Badge className="absolute top-2 right-2 text-black font-semibold bg-white shadow-lg">
                              Default Image
                           </Badge>
                        ) : null}
                     </ContextMenuTrigger>
                     <ContextMenuContent>
                        <SetDefault publicUrl={publicUrl} secureUrl={secureUrl} token={token} productId={productId} />
                        <DeleteImage publicUrl={publicUrl} secureUrl={secureUrl} token={token} productId={productId} />
                     </ContextMenuContent>
                  </ContextMenu>
               ))}
            </div>
         )}
      </section>
   );
}
