import type { Metadata } from "next";

import type { ServerPageProps } from "@root/types";
import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "Update Product - Pacifio",
};

export default function AdminProductUpdate({ params }: ServerPageProps) {
   const { slug } = params;
   return <ParentComponent productId={slug} />;
}
