"use client";

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
} from "@root/components/ui";
import type { ChildProps } from "./writeReview";
import { useDeleteReview } from "@root/hooks";

export default function ConfirmDeletion({ onSuccess, slug, token }: ChildProps) {
   const { mutate: deleteReviewMutation, isPending } = useDeleteReview({ onSuccess });

   function onReviewDeletion() {
      if (isPending) return;
      deleteReviewMutation({ productId: slug, token });
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <div className="flex justify-end">
               <span className="bg-destructive cursor-pointer text-white p-2 text-xs">
                  <Trash className="w-4 h-4 mr-1 inline" /> <span>Delete this review</span>
               </span>
            </div>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this review and remove data from our servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={onReviewDeletion} disabled={isPending}>
                  Delete
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
