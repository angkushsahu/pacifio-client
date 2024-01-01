import type { Metadata } from "next";

import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "Products - Pacifio",
};

export default function Products() {
   return <ParentComponent />;
}
