import type { Metadata } from "next";

import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "Your shopping bag - Pacifio",
};

export default function ShoppingBag() {
   return <ParentComponent />;
}
