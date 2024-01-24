"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
   toast,
} from "@root/components/ui";
import type { ShoppingBagResponseType } from "@root/validations";
import { getShoppingBagQueryKey } from "@root/constants";
import { useRemoveFromBag } from "@root/hooks";

export default function ConfirmDeletion({ productId, token }: { productId: string; token: string }) {
   const queryClient = useQueryClient();

   function onSuccess(data: ShoppingBagResponseType) {
      queryClient.setQueryData([getShoppingBagQueryKey], () => data);
      toast({ title: data.message });
   }
   const { mutate: removeFromBagMutation, isPending } = useRemoveFromBag({ onSuccess });

   function onItemRemoval() {
      if (isPending) return;
      removeFromBagMutation({ productId, token });
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <div className="flex">
               <span className="flex items-center text-xs text-destructive cursor-pointer">
                  <Trash className="mr-2 w-3 h-3" /> Delete this item
               </span>
            </div>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
               <AlertDialogDescription>Make sure you want to remove this item from your shopping bag</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction disabled={isPending} onClick={onItemRemoval}>
                  Remove
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
