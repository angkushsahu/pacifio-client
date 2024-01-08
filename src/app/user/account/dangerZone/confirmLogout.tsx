"use client";

import { signOut } from "next-auth/react";

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
import { loginUrl } from "@root/constants/routes";

export default function ConfirmLogout() {
   function logout() {
      signOut({ callbackUrl: loginUrl });
      toast({ title: "User logged out successfully" });
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-36 border-2 border-destructive text-destructive hover:text-destructive">
               Logout
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
               <AlertDialogDescription>Wait a minute and make sure you want to logout</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
