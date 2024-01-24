import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import authOptions from "@root/app/api/auth/authOptions";
import type { ServerPageProps } from "@root/types";
import ParentComponent from "./parentComponent";
import { loginUrl } from "@root/constants";

// meta data comes here

export default async function AdminViewUser({ params }: ServerPageProps) {
   const { slug } = params;
   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return <ParentComponent token={session.token} userId={slug} />;
}
