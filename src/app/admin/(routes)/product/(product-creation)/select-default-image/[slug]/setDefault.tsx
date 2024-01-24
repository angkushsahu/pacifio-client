import { useQueryClient } from "@tanstack/react-query";

import type { ProductImageResponseType } from "@root/validations";
import { ContextMenuItem, toast } from "@root/components/ui";
import { getProductQueryKey } from "@root/constants";
import { useSelectDefaultImage } from "@root/hooks";
import type { ChildProps } from "./parentComponent";

export default function SetDefault({ productId, publicUrl, secureUrl, token }: ChildProps) {
   const queryClient = useQueryClient();

   function onSuccess(response: ProductImageResponseType) {
      toast({ title: response.message });
      queryClient.setQueryData([getProductQueryKey, productId], () => response);
   }
   const { mutate: selectDefaultImageMutation, isPending } = useSelectDefaultImage({ onSuccess });

   function setAsDefault() {
      if (isPending) return;
      selectDefaultImageMutation({ id: productId, token, values: { publicUrl, secureUrl } });
   }

   return (
      <ContextMenuItem inset className="cursor-pointer py-2 px-4" onClick={setAsDefault}>
         Set as default
      </ContextMenuItem>
   );
}
