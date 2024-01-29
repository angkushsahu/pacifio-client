"use client";

import { MoreHorizontal, MousePointerSquare, Pencil, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";

import { AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, toast } from "@root/components/ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@root/components/ui";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent } from "@root/components/ui";
import { baseAdminUpdateProductUrl, baseProductUrl, getAllProductsForAdminQueryKey } from "@root/constants";
import { deleteAllProductImagesAndFolder, getFolderNameForCloudinary } from "@root/lib";
import { useDeleteProduct, useGetProduct } from "@root/hooks";
import type { ResponseType } from "@root/validations";

export default function ProductActions({ id, token }: { id: string; token: string }) {
   const queryClient = useQueryClient();
   const [showAlert, setShowAlert] = useState(false);

   const { data: productResponse, isLoading } = useGetProduct({ enabled: true, id });

   function onSuccess(data: ResponseType) {
      queryClient.invalidateQueries({ queryKey: [getAllProductsForAdminQueryKey] });
      toast({ title: data.message });
   }
   const { mutate: deleteProductMutation, isPending } = useDeleteProduct({ onSuccess });

   async function onProductDeletion() {
      if (isPending || isLoading || !productResponse?.data.product) return;

      const { name: productName, images } = productResponse.data.product;
      const folderName = getFolderNameForCloudinary({ productName });
      const publicUrls = images.map((image) => image.publicUrl);

      const response = await deleteAllProductImagesAndFolder({ folderName, publicUrls });
      if (response) deleteProductMutation({ id, token });
   }

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
                  <AlertDialogAction onClick={onProductDeletion} disabled={isPending}>
                     Delete
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   );
}
