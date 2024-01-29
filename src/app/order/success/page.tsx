import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import { homeUrl, loginUrl } from "@root/constants";
import type { ServerPageProps } from "@root/types";
import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "Order placed successfully - Pacifio",
};

export default async function OrderSuccess({ searchParams }: ServerPageProps) {
   const { order_id } = searchParams;
   if (!order_id) redirect(homeUrl, RedirectType.replace);

   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   const orderId = typeof order_id === "string" ? order_id : order_id[0];

   return <ParentComponent orderId={orderId} token={session.token} />;
}
