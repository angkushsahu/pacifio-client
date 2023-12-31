import { notFound } from "next/navigation";

import type { UserRoleType, ServerPageProps } from "@root/types";
import ParentAdminUsers from "./parentAdminUsers";
import { getMetadata } from "@root/lib";

export function generateMetadata({ searchParams }: ServerPageProps) {
   return getMetadata({
      backupTitle: "Admin Users - Pacifio",
      suffix: " Users - Pacifio",
      searchParamsKey: "role",
      searchParams,
   });
}

export default function AdminUsers({ searchParams }: ServerPageProps) {
   const { role } = searchParams;
   if (!role || typeof role !== "string") notFound();

   return <ParentAdminUsers role={role as UserRoleType} />;
}
