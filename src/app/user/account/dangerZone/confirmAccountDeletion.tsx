"use client";

import { signOut, useSession } from "next-auth/react";
import { AxiosError } from "axios";

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
import { signupUrl } from "@root/constants/routes";
import { errorSchema } from "@root/validations";
import type { ResponseData } from "@root/types";
import { useDeleteUser } from "@root/hooks";

export default function ConfirmAccountDeletion() {
   const { data: session } = useSession();

   function onSuccess(data: ResponseData) {
      signOut({ callbackUrl: signupUrl });
      toast({ title: data.message });
   }
   function onError(error: AxiosError) {
      const validatedError = errorSchema.safeParse(error.response?.data);
      if (validatedError.success) toast({ title: validatedError.data.message, variant: "destructive" });
      else toast({ title: error.message, variant: "destructive" });
   }

   const { mutate: deleteUser, isPending } = useDeleteUser({ onSuccess, onError });

   function onUserDeletion() {
      if (session && session.token) deleteUser({ token: session.token });
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
