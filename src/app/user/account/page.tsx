import type { Metadata } from "next";

import AccountInfo from "./accountInfo";
import DangerZone from "./dangerZone";
import QuickLinks from "./quickLinks";

export const metadata: Metadata = {
   title: "Your Account - Pacifio",
};

export default function Account() {
   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12">
         <section className="mb-10">
            <h1 className="font-semibold text-3xl mb-6">Your Account</h1>
            <AccountInfo />
         </section>
         <section className="mb-10">
            <h1 className="font-semibold text-2xl text-custom-foreground mb-4">Quick Links</h1>
            <QuickLinks />
         </section>
         <section>
            <h1 className="font-semibold text-2xl text-custom-foreground mb-6 flex items-center">Danger zone</h1>
            <DangerZone />
         </section>
      </main>
   );
}
