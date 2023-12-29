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

export default function ConfirmDeletion() {
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
               <AlertDialogAction onClick={() => console.log("Deletion mutation here please")}>Remove</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
