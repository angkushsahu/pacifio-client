import { Frown } from "lucide-react";
import Link from "next/link";

import { createAddressUrl } from "@root/constants";
import { Button } from "@root/components/ui";

export default function EmptyAddress() {
   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12 flex flex-col items-center justify-center gap-y-5">
         <Frown size="200" strokeWidth="1.5" className="text-custom-foreground" />
         <h1 className="text-2xl font-semibold text-center">You have not saved any address yet, let's create one</h1>
         <Link href={createAddressUrl}>
            <Button>Add New Address</Button>
         </Link>
      </main>
   );
}
