import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import { homeUrl } from "@root/constants";
import LoginForm from "./loginForm";

export const metadata: Metadata = {
   title: "Login - Pacifio",
};

export default async function Login() {
   const session = await getServerSession(authOptions);
   if (session?.user && session?.token) redirect(homeUrl, RedirectType.replace);

   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12 flex flex-col justify-center">
         <h1 className="font-semibold text-3xl mb-6">Login</h1>
         <LoginForm />
      </main>
   );
}
