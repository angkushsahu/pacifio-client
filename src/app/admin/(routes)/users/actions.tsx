"use client";

import { MoreHorizontal, MousePointerSquare, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";

import { AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, toast } from "@root/components/ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@root/components/ui";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent } from "@root/components/ui";
import { baseAdminViewUserUrl, getAllUsersForAdminQueryKey } from "@root/constants";
import type { ResponseType } from "@root/validations";
import { useDeleteUserByAdmin } from "@root/hooks";

export default function UserActions({ id, token }: { id: string; token: string }) {
   const queryClient = useQueryClient();
   const [showAlert, setShowAlert] = useState(false);

   function onSuccess(data: ResponseType) {
      queryClient.invalidateQueries({ queryKey: [getAllUsersForAdminQueryKey] });
      toast({ title: data.message });
   }
   const { mutate: deleteUserMutation, isPending } = useDeleteUserByAdmin({ onSuccess });

   function onUserDeletion() {
      if (isPending) return;
      deleteUserMutation({ token, userId: id });
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
                  <Link href={`${baseAdminViewUserUrl}/${id}`}>
                     <MousePointerSquare className="mr-2 h-4 w-4" />
                     <span>View User</span>
                  </Link>
               </DropdownMenuItem>
               <DropdownMenuItem asChild className="cursor-pointer text-destructive" onClick={() => setShowAlert(true)}>
                  <span className="flex items-center">
                     <Trash className="mr-2 h-4 w-4" />
                     <span>Delete User</span>
                  </span>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
         <AlertDialog open={showAlert} onOpenChange={setShowAlert} defaultOpen={false}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete the user account and remove it from our servers.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onUserDeletion} disabled={isPending}>
                     Delete
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   );
}
