import type { Metadata } from "next";

import type { ServerPageProps } from "@root/types";
import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "Select Default Image - Pacifio",
};

export default function AdminSelectDefaultImage({ params }: ServerPageProps) {
   const { slug } = params;
   return <ParentComponent productId={slug} />;
}
