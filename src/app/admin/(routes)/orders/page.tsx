import { notFound } from "next/navigation";

import type { OrderStatusType, ServerPageProps } from "@root/types";
import ParentAdminOrders from "./parentAdminOrders";
import { getMetadata } from "@root/lib";

export function generateMetadata({ searchParams }: ServerPageProps) {
   return getMetadata({
      backupTitle: "Admin Orders - Pacifio",
      suffix: " Orders - Pacifio",
      searchParamsKey: "status",
      searchParams,
   });
}

export default function AdminOrders({ searchParams }: ServerPageProps) {
   const { status } = searchParams;
   if (!status || typeof status !== "string") notFound();

   return <ParentAdminOrders status={status as OrderStatusType} />;
}
