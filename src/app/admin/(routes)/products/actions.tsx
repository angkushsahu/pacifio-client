import { MoreHorizontal, MousePointerSquare, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@root/components/ui";
import { baseAdminUpdateProductUrl, baseProductUrl } from "@root/constants/routes";

export default function ProductActions({ id }: { id: string }) {
   const [showAlert, setShowAlert] = useState(false);

   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <div className="flex justify-end lg:justify-start w-7 ml-auto lg:mr-auto lg:ml-0">
                  <MoreHorizontal className="cursor-pointer" />
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={`${baseProductUrl}/${id}`}>
                     <MousePointerSquare className="mr-2 h-4 w-4" />
                     <span>View Product</span>
                  </Link>
               </DropdownMenuItem>
               <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={`${baseAdminUpdateProductUrl}/${id}`}>
                     <Pencil className="mr-2 h-4 w-4" />
                     <span>Update Product</span>
                  </Link>
               </DropdownMenuItem>
               <DropdownMenuItem asChild className="cursor-pointer text-destructive" onClick={() => setShowAlert(true)}>
                  <span className="flex items-center">
                     <Trash className="mr-2 h-4 w-4" />
                     <span>Delete Product</span>
                  </span>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
         <AlertDialog open={showAlert} onOpenChange={setShowAlert} defaultOpen={false}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete this product and remove it from our servers.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   );
}
