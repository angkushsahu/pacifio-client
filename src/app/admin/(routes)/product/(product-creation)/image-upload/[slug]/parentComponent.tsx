"use client";

import Image from "next/image";

import { ContextMenu, ContextMenuTrigger } from "@root/components/ui";
import Loading from "@root/app/admin/(routes)/loading";
import { useGetProduct } from "@root/hooks";
import DeleteImage from "./deleteImage";
import UploadImage from "./uploadImage";

export interface ParentComponentProps {
   productId: string;
   token: string;
}

export interface ChildProps extends Pick<ParentComponentProps, "productId" | "token"> {}

export default function ParentComponent({ productId, token }: ParentComponentProps) {
   const { data } = useGetProduct({ enabled: true, id: productId });
   if (!data) return <Loading />;
   const { product } = data.data;

   const fileName = product.name.split(" ").slice(0, 4).join("-"); // to be provided as a prop to uploadImage

   return (
      <section className="pt-4">
         <h1 className="font-semibold text-3xl mb-6">Upload Images</h1>
         <div className="mb-8 flex flex-wrap gap-6">
            {product.images.map(({ publicUrl, secureUrl }) => (
               <ContextMenu key={publicUrl}>
                  <ContextMenuTrigger>
                     <Image src={secureUrl} alt={publicUrl} width={260} height={260} />
                  </ContextMenuTrigger>
                  <DeleteImage publicUrl={publicUrl} secureUrl={secureUrl} productId={productId} token={token} />
               </ContextMenu>
            ))}
         </div>
         {product.images.length >= 4 ? null : (
            <UploadImage fileName={fileName} images={product.images} productId={productId} token={token} />
         )}
      </section>
   );
}
