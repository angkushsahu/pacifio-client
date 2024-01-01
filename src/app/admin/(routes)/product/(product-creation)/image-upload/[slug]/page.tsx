import type { Metadata } from "next";

import type { ServerPageProps } from "@root/types";
import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "Upload Images - Pacifio",
};

export default function AdminProductImageUpload({ params }: ServerPageProps) {
   const { slug } = params;
   return <ParentComponent productId={slug} />;
}
