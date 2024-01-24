"use client";

import { signIn } from "next-auth/react";

import { type UserType, userSchema } from "@root/validations";
import { homeUrl } from "@root/constants";
import { toast } from "@root/components/ui";

export interface NextAuthSigninArgs {
   user: UserType;
   token: string;
   message: string;
}

export default function nextAuthSignin({ message, token, user }: NextAuthSigninArgs) {
   const validatedUser = userSchema.safeParse(user);
   if (!validatedUser.success) {
      toast({ title: "Unusual format", variant: "destructive" });
      return;
   }

   if (!token) {
      toast({ title: "Token not specified", variant: "destructive" });
      return;
   }

   toast({ title: message as string });
   signIn("credentials", {
      email: validatedUser.data.email,
      name: validatedUser.data.name,
      createdAt: validatedUser.data.createdAt,
      id: validatedUser.data.id,
      role: validatedUser.data.role,
      token,
      callbackUrl: homeUrl,
   });
}
