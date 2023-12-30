"use client";

import { Frown } from "lucide-react";
import Link from "next/link";

import { allOrdersUrl, contactUrl } from "@root/constants/routes";
import type { ErrorProps } from "@root/types";

export default function OrderSuccessError({ error }: ErrorProps) {
   return (
      <main className="min-h-section p-5 flex flex-col items-center justify-center gap-y-4">
         <Frown size="200" strokeWidth="1.5" className="text-custom-foreground" />
         <div className="text-center max-w-[60ch]">
            <h1 className="text-2xl font-semibold">{error.message}</h1>
            <p className="my-4">
               Visit your order history page from{" "}
               <Link href={allOrdersUrl} className="font-semibold underline underline-offset-4">
                  here
               </Link>{" "}
               and check if the order is registered, if it is there, do not fret, your order has been saved successfully with us.
            </p>
            <p>
               If it is not there, then contact us from{" "}
               <Link href={contactUrl} className="font-semibold underline underline-offset-4">
                  here.
               </Link>
               <p>Make sure to explain your problems properly.</p>
            </p>
         </div>
      </main>
   );
}
