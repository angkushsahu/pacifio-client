import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import { loginUrl } from "@root/constants";
import UserInfo from "./userInfo";

export const metadata: Metadata = {
   title: "Update Account - Pacifio",
};

export default async function Update() {
   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12 flex flex-col justify-center">
         <h1 className="font-semibold text-3xl mb-6">Update Account</h1>
         <UserInfo token={session.token} />
      </main>
   );
}
