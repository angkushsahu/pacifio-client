import { Frown } from "lucide-react";
import Link from "next/link";

import { Button } from "@root/components/ui";
import { homeUrl } from "@root/constants";

export default function EmptyOrders() {
   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12 flex flex-col items-center justify-center gap-y-5">
         <Frown size="200" strokeWidth="1.5" className="text-custom-foreground" />
         <h1 className="text-2xl font-semibold">You have not shopped anything yet, but we can solve this</h1>
         <Link href={homeUrl}>
            <Button>Start Shopping Now</Button>
         </Link>
      </main>
   );
}
