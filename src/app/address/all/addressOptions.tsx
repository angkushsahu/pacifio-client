"use client";

import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
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
   toast,
} from "@root/components/ui";
import type { AllAddressResponseType, ResponseType } from "@root/validations";
import { baseUpdateAddressUrl, getAllAddressQueryKey } from "@root/constants";
import { useDeleteAddress } from "@root/hooks";

export interface AddressOptionsProps {
   addressId: string;
   token: string;
}

export default function AddressOptions({ addressId, token }: AddressOptionsProps) {
   const queryClient = useQueryClient();
   const [showAlert, setShowAlert] = useState(false);

   function onSuccess(data: ResponseType) {
      queryClient.setQueryData([getAllAddressQueryKey], function (presentAddresses: AllAddressResponseType) {
         const { addresses } = presentAddresses.data;
         const newAddresses = addresses.filter((address) => address.id !== addressId);

         return {
            ...presentAddresses,
            data: { addresses: newAddresses, totalAddresses: newAddresses.length },
         };
      });
      toast({ title: data.message });
   }
   const { mutate: deleteAddress, isPending } = useDeleteAddress({ onSuccess });

   function onAddressDeletion() {
      if (isPending) return;
      deleteAddress({ id: addressId, token });
   }

   return (
      <>
         <DropdownMenu>
            <div className="flex justify-end items-center">
               <DropdownMenuTrigger asChild>
                  <div className="bg-custom hover:bg-custom-hover px-2 py-1 cursor-pointer">
                     <MoreHorizontal />
                  </div>
               </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent align="end">
               <DropdownMenuItem className="cursor-pointer">
                  <Link href={`${baseUpdateAddressUrl}/${addressId}`} className="flex items-center w-full">
                     <Pencil className="mr-2 w-4 h-4" /> Edit
                  </Link>
               </DropdownMenuItem>
               <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => setShowAlert(true)}>
                  <Trash className="mr-2 w-4 h-4" /> Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
         <AlertDialog open={showAlert} onOpenChange={setShowAlert} defaultOpen={false}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete this address and remove it from our servers.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onAddressDeletion} disabled={isPending}>
                     Delete
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   );
}
