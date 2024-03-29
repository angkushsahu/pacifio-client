import type { Metadata } from "next";
import { Frown } from "lucide-react";
import Link from "next/link";

import { Button } from "@root/components/ui";
import { homeUrl } from "@root/constants";

export const metadata: Metadata = {
   title: "Order Failed - Pacifio",
};

export default function OrderFailure() {
   return (
      <main className="min-h-section center-layout px-5 py-8 flex flex-col items-center justify-center relative">
         <Frown size="200" strokeWidth="1.5" className="text-custom-foreground" />
         <p className="text-center text-lg font-semibold my-4">Unable to process order, please try again later</p>
         <Link href={homeUrl}>
            <Button>Keep Shopping</Button>
         </Link>
      </main>
   );
}
