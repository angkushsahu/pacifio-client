import type { PropsWithChildren } from "react";

import { AdminSidebar } from "@root/components/elements";

export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <main className="min-h-section flex flex-col xl:flex-row">
         <AdminSidebar />
         <section className="px-5 pt-4 pb-14 flex-1">{children}</section>
      </main>
   );
}
