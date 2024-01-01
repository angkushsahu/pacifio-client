import type { Metadata } from "next";

import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "Add Product - Pacifio",
};

export default function AdminCreateProduct() {
   return <ParentComponent />;
}
