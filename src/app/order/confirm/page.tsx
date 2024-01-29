import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import { loginUrl, shippingUrl } from "@root/constants";
import IsAddressAvailable from "./isAddressAvailable";
import type { ServerPageProps } from "@root/types";

export const metadata: Metadata = {
   title: "Confirm your order - Pacifio",
};

export default async function ConfirmOrder({ searchParams }: ServerPageProps) {
   const { shipping_id } = searchParams;
   if (!shipping_id) redirect(shippingUrl);

   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   const shippingId = typeof shipping_id === "string" ? shipping_id : shipping_id[0];

   return <IsAddressAvailable shippingId={shippingId} token={session.token} />;
}
