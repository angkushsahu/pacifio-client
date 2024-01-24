import { RedirectType, notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import type { ProductStockType, ServerPageProps } from "@root/types";
import authOptions from "@root/app/api/auth/authOptions";
import ParentComponent from "./parentComponent";
import { loginUrl } from "@root/constants";
import isOutofStock from "./isOutofStock";

export function generateMetadata({ searchParams }: ServerPageProps) {
   const { stock } = searchParams;

   if (!stock || typeof stock !== "string") {
      return {
         title: "Admin Products - Pacifio",
      };
   }

   return {
      title: `${isOutofStock(stock)} Products - Pacifio`,
   };
}

export default async function AdminUsers({ searchParams }: ServerPageProps) {
   const { stock } = searchParams;
   if (!stock || typeof stock !== "string") notFound();

   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return <ParentComponent stock={stock as ProductStockType} token={session.token} />;
}
