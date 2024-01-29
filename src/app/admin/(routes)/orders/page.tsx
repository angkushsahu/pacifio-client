import { RedirectType, notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import type { OrderStatusType, ServerPageProps } from "@root/types";
import authOptions from "@root/app/api/auth/authOptions";
import ParentComponent from "./parentComponent";
import { loginUrl } from "@root/constants";
import { getMetadata } from "@root/lib";

export function generateMetadata({ searchParams }: ServerPageProps) {
   return getMetadata({
      backupTitle: "Admin Orders - Pacifio",
      suffix: " Orders - Pacifio",
      searchParamsKey: "status",
      searchParams,
   });
}

export default async function AdminOrders({ searchParams }: ServerPageProps) {
   const { status } = searchParams;
   if (!status || typeof status !== "string") notFound();

   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return <ParentComponent status={status as OrderStatusType} token={session.token} />;
}
