import { RedirectType, notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import type { UserRoleType, ServerPageProps } from "@root/types";
import authOptions from "@root/app/api/auth/authOptions";
import ParentComponent from "./parentComponent";
import { loginUrl } from "@root/constants";
import { getMetadata } from "@root/lib";

export function generateMetadata({ searchParams }: ServerPageProps) {
   return getMetadata({
      backupTitle: "Regular Users - Pacifio",
      suffix: " Users - Pacifio",
      searchParamsKey: "role",
      searchParams: searchParams.role === "user" ? null : searchParams,
   });
}

export default async function AdminUsers({ searchParams }: ServerPageProps) {
   const { role } = searchParams;
   if (!role || typeof role !== "string") notFound();

   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return <ParentComponent role={role as UserRoleType} token={session.token} />;
}
