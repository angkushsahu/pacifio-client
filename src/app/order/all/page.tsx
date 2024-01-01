import type { Metadata } from "next";

import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "Order History - Pacifio",
};

export default function AllOrders() {
   return <ParentComponent />;
}
