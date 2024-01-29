import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";

import { ContextMenuContent, ContextMenuItem, toast } from "@root/components/ui";
import type { ProductResponseType } from "@root/validations";
import { getProductQueryKey } from "@root/constants";
import type { ChildProps } from "./parentComponent";
import { useDeleteImage } from "@root/hooks";
import { deleteImage } from "@root/lib";

export interface DeleteImageProps extends ChildProps {
   publicUrl: string;
   secureUrl: string;
}

export default function DeleteImage({ productId, publicUrl, secureUrl, token }: DeleteImageProps) {
   const queryClient = useQueryClient();

   function onSuccess(response: ProductResponseType) {
      toast({ title: response.message });
      queryClient.setQueryData([getProductQueryKey, response.data.product.id], () => response);
   }
   const { mutate: deleteImageMutation, isPending } = useDeleteImage({ onSuccess });

   async function onDeleteImage() {
      if (isPending) return;
      const res = await deleteImage({ publicUrl });
      if (res) deleteImageMutation({ id: productId, token, values: { publicUrl, secureUrl } });
   }

   return (
      <ContextMenuContent>
         <ContextMenuItem
            inset
            className="cursor-pointer py-2 px-4 text-destructive"
            onClick={onDeleteImage}
            disabled={isPending}
         >
            <Trash className="mr-2 w-4 h-4" />
            Delete
         </ContextMenuItem>
      </ContextMenuContent>
   );
}
