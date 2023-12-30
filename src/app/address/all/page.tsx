import type { Metadata } from "next";

import AddressParent from "./addressParent";

export const metadata: Metadata = {
   title: "Saved addresses - Pacifio",
};

export default function AllAddress() {
   return <AddressParent />;
}
