"use client";

import { signOut, useSession } from "next-auth/react";

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
   Button,
   toast,
} from "@root/components/ui";
import type { ResponseType } from "@root/validations";
import { signupUrl } from "@root/constants";
import { useDeleteUser } from "@root/hooks";

export default function ConfirmAccountDeletion() {
   const { data: session } = useSession();

   function onSuccess(data: ResponseType) {
      signOut({ callbackUrl: signupUrl });
      toast({ title: data.message });
   }
   const { mutate: deleteUser, isPending } = useDeleteUser({ onSuccess });

   function onUserDeletion() {
      if (isPending) return;
      if (session?.user && session?.token) deleteUser({ token: session.token });
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-36" disabled={isPending}>
               Delete Account
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action may have consequences, all your saved data including your shopping bag items, order history, etc,
                  will be removed forever
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={onUserDeletion} disabled={isPending}>
                  Delete my Account
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
