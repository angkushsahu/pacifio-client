"use client";

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, useState } from "react";
import type { AxiosError } from "axios";

import { errorSchema } from "@root/validations";
import { toast } from "@root/components/ui";

export default function Providers({ children }: PropsWithChildren) {
   function onError(error: Error) {
      const validatedError = errorSchema.safeParse((error as AxiosError).response?.data);
      if (validatedError.success) {
         const { message } = validatedError.data;
         if (typeof message === "string") toast({ title: message, variant: "destructive" });
         else message.map((msg) => toast({ title: msg, variant: "destructive" }));
      } else toast({ title: error.message, variant: "destructive" });
   }

   const queryInstance = () =>
      new QueryClient({
         queryCache: new QueryCache({ onError }),
         mutationCache: new MutationCache({ onError }),
      });

   const [queryClient] = useState(queryInstance);

   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
