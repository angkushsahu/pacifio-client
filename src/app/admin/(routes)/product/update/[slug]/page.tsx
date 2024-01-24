import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import type { ServerPageProps } from "@root/types";
import ParentComponent from "./parentComponent";
import { loginUrl } from "@root/constants";

export const metadata: Metadata = {
   title: "Update Product - Pacifio",
};

export default async function AdminProductUpdate({ params }: ServerPageProps) {
   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return <ParentComponent productId={params.slug} token={session.token} />;
}
