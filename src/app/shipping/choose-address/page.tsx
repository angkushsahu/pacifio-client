import type { Metadata } from "next";

import AddressParent from "./addressParent";

export const metadata: Metadata = {
   title: "Shipping order - Pacifio",
};

export default function Shipping() {
   return <AddressParent />;
}
