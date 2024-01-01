import type { Metadata } from "next";

import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "Saved addresses - Pacifio",
};

export default function AllAddress() {
   return <ParentComponent />;
}
