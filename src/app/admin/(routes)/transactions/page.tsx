import type { Metadata } from "next";

import ParentAdminTransactions from "./parentAdminTransactions";

export const metadata: Metadata = {
   title: "Transactions - Pacifio",
};

export default function Transactions() {
   return <ParentAdminTransactions />;
}
