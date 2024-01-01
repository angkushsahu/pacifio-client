import type { Metadata } from "next";

import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "Shipping order - Pacifio",
};

export default function Shipping() {
   return <ParentComponent />;
}
