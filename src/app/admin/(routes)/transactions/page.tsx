import type { Metadata } from "next";

import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "Transactions - Pacifio",
};

export default function Transactions() {
   return <ParentComponent />;
}
