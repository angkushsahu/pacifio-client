import type { Metadata } from "next";

import ShowAllAddress from "./showAllAddress";

export const metadata: Metadata = {
   title: "Shipping order - Pacifio",
};

export default function Shipping() {
   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Choose an address</h1>
         <ShowAllAddress />
      </main>
   );
}
