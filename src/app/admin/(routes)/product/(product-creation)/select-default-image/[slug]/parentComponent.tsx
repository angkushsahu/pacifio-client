"use client";

import { Trash } from "lucide-react";
import Image from "next/image";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, toast } from "@root/components/ui";
import deleteImage from "@root/lib/deleteImage";
import logo from "@root/assets/logo.png";

export interface ParentComponentProps {
   productId: string;
}

export default function ParentComponent({ productId }: ParentComponentProps) {
   /*
    * give a border to the image which is set as the default image
    */

   async function onDeleteImage(publicId: string) {
      const res = await deleteImage({ publicId });
      if (res) toast({ title: "Image deleted successfully" });
   }

   return (
      <section className="pt-4">
         <h1 className="font-semibold text-3xl">Select Default Image</h1>
         <p className="mb-8 mt-2">Right click or long press for more options</p>
         <div className="mb-8 flex flex-wrap gap-6">
            {Array.from({ length: 5 }).map((_, idx) => (
               <ContextMenu key={idx}>
                  <ContextMenuTrigger>
                     <Image src={logo} alt="Random image" width={260} height={260} />
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                     <ContextMenuItem inset className="cursor-pointer py-2 px-4">
                        Set as default
                     </ContextMenuItem>
                     <ContextMenuItem
                        inset
                        className="cursor-pointer py-2 px-4 text-destructive"
                        onClick={() => onDeleteImage("")} // fill the empty string here with public_id
                     >
                        <Trash className="mr-2 w-4 h-4" />
                        Delete
                     </ContextMenuItem>
                  </ContextMenuContent>
               </ContextMenu>
            ))}
         </div>
      </section>
   );
}
