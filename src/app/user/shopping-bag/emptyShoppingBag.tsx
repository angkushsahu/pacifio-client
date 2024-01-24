import { Frown } from "lucide-react";
import Link from "next/link";

import { Button } from "@root/components/ui";
import { homeUrl } from "@root/constants";

export default function EmptyShoppingBag() {
   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12 flex flex-col items-center justify-center gap-y-5">
         <Frown size="200" strokeWidth="1.5" className="text-custom-foreground" />
         <h1 className="text-2xl font-semibold max-w-[45ch] text-center">
            Your shopping bag is empty, don't keep it waiting, start putting our products inside it
         </h1>
         <Link href={homeUrl}>
            <Button>Start Shopping Now</Button>
         </Link>
      </main>
   );
}
