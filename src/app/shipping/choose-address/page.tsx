import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import ParentComponent from "./parentComponent";
import { loginUrl } from "@root/constants";

export const metadata: Metadata = {
   title: "Shipping order - Pacifio",
};

export default async function Shipping() {
   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return <ParentComponent token={session.token} />;
}
