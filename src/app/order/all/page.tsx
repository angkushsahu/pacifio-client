import type { Metadata } from "next";

import AllOrdersParent from "./allOrdersParent";

export const metadata: Metadata = {
   title: "Order History - Pacifio",
};

export default function AllOrders() {
   return <AllOrdersParent />;
}
