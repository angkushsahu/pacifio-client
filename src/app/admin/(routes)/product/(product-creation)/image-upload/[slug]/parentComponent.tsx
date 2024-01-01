"use client";

import { CldUploadButton } from "next-cloudinary";
import { Trash } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { Button, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, toast } from "@root/components/ui";
import type { CloudinaryResultsType, ImageInfoType } from "@root/types";
import deleteImage from "@root/lib/deleteImage";
import env from "@root/config/client.mjs";

export interface ParentComponentProps {
   productId: string;
}

export default function ParentComponent({ productId }: ParentComponentProps) {
   /*
    * Make an api call to the id of the product and gather all the images if they are already present from before and set it as default value in setImages array below
    */
   let filePath = "Product name is too long";
   filePath = filePath.split(" ").slice(0, 4).join("-");

   const [images, setImages] = useState<Array<ImageInfoType>>([]);

   function onImageUpload(e: CloudinaryResultsType) {
      if (e.event === "success") {
         const { public_id, secure_url } = e.info;
         setImages((previousItems) => [...previousItems, { public_id, secure_url }]);
      }
   }

   async function onDeleteImage(publicId: string) {
      const res = await deleteImage({ publicId });
      if (res) toast({ title: "Image deleted successfully" });
   }

   return (
      <section className="pt-4">
         <h1 className="font-semibold text-3xl mb-6">Upload Images</h1>
         <div className="mb-8 flex flex-wrap gap-6">
            {images.map(({ public_id, secure_url }) => (
               <ContextMenu key={public_id}>
                  <ContextMenuTrigger>
                     <Image src={secure_url} alt={public_id} width={260} height={260} />
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                     <ContextMenuItem
                        inset
                        className="cursor-pointer py-2 px-4 text-destructive"
                        onClick={() => onDeleteImage(public_id)}
                     >
                        <Trash className="mr-2 w-4 h-4" />
                        Delete
                     </ContextMenuItem>
                  </ContextMenuContent>
               </ContextMenu>
            ))}
         </div>
         <div className="flex flex-col gap-y-4 items-center justify-center">
            <Button
               asChild
               variant={images.length >= 1 ? "outline" : "default"}
               className="border-2 border-custom-foreground w-48"
            >
               <CldUploadButton
                  uploadPreset={env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  onUpload={(e) => onImageUpload(e as CloudinaryResultsType)}
                  options={{ folder: `pacifio/temp-files/${filePath}`, maxFiles: 4 }}
               >
                  {images.length >= 1 ? "Upload More Images" : "Upload Image"}
               </CldUploadButton>
            </Button>
            {images.length >= 1 ? <Button className="w-48">Done</Button> : null}
         </div>
      </section>
   );
}
