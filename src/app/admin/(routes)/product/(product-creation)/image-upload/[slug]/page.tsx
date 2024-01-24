import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import type { ServerPageProps } from "@root/types";
import ParentComponent from "./parentComponent";
import { loginUrl } from "@root/constants";

export const metadata: Metadata = {
   title: "Upload Images - Pacifio",
};

export default async function AdminProductImageUpload({ params }: ServerPageProps) {
   const { slug } = params;
   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return <ParentComponent productId={slug} token={session.token} />;
}
