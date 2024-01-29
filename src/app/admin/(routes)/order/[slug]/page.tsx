import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import ParentComponent from "./parentComponent";
import { ServerPageProps } from "@root/types";
import { loginUrl } from "@root/constants";

export const metadata: Metadata = {
   title: "View Order - Pacifio",
};

export default async function AdminViewOrder({ params }: ServerPageProps) {
   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return <ParentComponent orderId={params.slug} token={session.token} />;
}
