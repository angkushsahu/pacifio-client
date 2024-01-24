import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import ChangePasswordForm from "./changePasswordForm";
import { loginUrl } from "@root/constants";

export const metadata: Metadata = {
   title: "Change Password - Pacifio",
};

export default async function ChangePassword() {
   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12 flex flex-col justify-center">
         <h1 className="font-semibold text-3xl mb-6">Change Password</h1>
         <ChangePasswordForm token={session.token} />
      </main>
   );
}
