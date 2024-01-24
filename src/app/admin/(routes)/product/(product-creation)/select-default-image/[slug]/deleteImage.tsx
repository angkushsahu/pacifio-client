import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";

import type { ProductImageResponseType } from "@root/validations";
import { ContextMenuItem, toast } from "@root/components/ui";
import { getProductQueryKey } from "@root/constants";
import type { ChildProps } from "./parentComponent";
import deleteImage from "@root/lib/deleteImage";
import { useDeleteImage } from "@root/hooks";

export default function DeleteImage({ productId, publicUrl, secureUrl, token }: ChildProps) {
   const queryClient = useQueryClient();

   function onSuccess(response: ProductImageResponseType) {
      toast({ title: response.message });
      queryClient.setQueryData([getProductQueryKey, productId], () => response);
   }
   const { mutate: deleteImageMutation, isPending } = useDeleteImage({ onSuccess });

   async function onDeleteImage() {
      if (isPending) return;
      const res = await deleteImage({ publicUrl });
      if (res) deleteImageMutation({ id: productId, token, values: { publicUrl, secureUrl } });
   }

   return (
      <ContextMenuItem inset className="cursor-pointer py-2 px-4 text-destructive" onClick={onDeleteImage}>
         <Trash className="mr-2 w-4 h-4" />
         Delete
      </ContextMenuItem>
   );
}
