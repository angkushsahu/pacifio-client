"use client";

import { Frown, RotateCcwIcon } from "lucide-react";
import type { ErrorProps } from "@root/types";
import { Button } from "@root/components/ui";

export default function Error({ error, reset }: ErrorProps) {
   return (
      <main className="min-h-section p-5 flex flex-col items-center justify-center gap-y-4">
         <Frown size="200" strokeWidth="1.5" className="text-custom-foreground" />
         <h1 className="text-center">
            <span className="font-semibold">{error.name}</span> - {error.message}
         </h1>
         <Button onClick={reset}>
            <RotateCcwIcon className="mr-2 h-4 w-4" /> Try again
         </Button>
      </main>
   );
}
