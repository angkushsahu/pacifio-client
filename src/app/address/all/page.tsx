import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import { loginUrl } from "@root/constants";
import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "Saved addresses - Pacifio",
};

export default async function AllAddress() {
   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return <ParentComponent userId={session.user.id} token={session.token} />;
}
