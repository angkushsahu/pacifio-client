import type { Metadata } from "next";

import ShowAllAddress from "./showAllAddress";

export const metadata: Metadata = {
   title: "Saved addresses - Pacifio",
};

export default function AllAddress() {
   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Saved addresses</h1>
         <ShowAllAddress />
      </main>
   );
}
