import type { Metadata } from "next";

import ShoppingBagParent from "./shoppingBagParent";

export const metadata: Metadata = {
   title: "Your shopping bag - Pacifio",
};

export default function ShoppingBag() {
   return <ShoppingBagParent />;
}
