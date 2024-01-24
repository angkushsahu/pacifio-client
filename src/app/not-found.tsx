import { FileX, Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@root/components/ui";
import { homeUrl } from "@root/constants";

export const metadata: Metadata = {
   title: "Page does not exist - Pacifio",
};

export default function NotFound() {
   return (
      <main className="min-h-section p-5 flex flex-col items-center justify-center gap-y-5">
         <FileX size="200" strokeWidth="1.5" className="text-custom-foreground" />
         <h1 className="text-2xl font-semibold">Looks like you are lost</h1>
         <Link href={homeUrl} replace>
            <Button>
               <Home className="mr-2 h-4 w-4" /> Let's get back to Home
            </Button>
         </Link>
      </main>
   );
}
