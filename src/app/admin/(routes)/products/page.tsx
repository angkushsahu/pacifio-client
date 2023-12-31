import { notFound } from "next/navigation";

import type { ProductStockType, ServerPageProps } from "@root/types";
import ParentAdminProducts from "./parentAdminProducts";
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

export default function AdminUsers({ searchParams }: ServerPageProps) {
   const { stock } = searchParams;
   if (!stock || typeof stock !== "string") notFound();

   return <ParentAdminProducts stock={stock as ProductStockType} />;
}
