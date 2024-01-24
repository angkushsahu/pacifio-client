"use client";

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, useState } from "react";
import type { AxiosError } from "axios";

import { errorSchema } from "@root/validations";
import { toast } from "@root/components/ui";

export default function Providers({ children }: PropsWithChildren) {
   const queryInstance = () =>
      new QueryClient({
         queryCache: new QueryCache({
            onError: function (error: Error) {
               const validatedError = errorSchema.safeParse((error as AxiosError).response?.data);
               if (validatedError.success) {
                  const { message } = validatedError.data;
                  if (typeof message === "string") throw new Error(message);
                  else throw new Error(message[0]);
               } else throw new Error(error.message);
            },
         }),
         mutationCache: new MutationCache({
            onError: function (error: Error) {
               const validatedError = errorSchema.safeParse((error as AxiosError).response?.data);
               if (validatedError.success) {
                  const { message } = validatedError.data;
                  if (typeof message === "string") toast({ title: message, variant: "destructive" });
                  else message.map((msg) => toast({ title: msg, variant: "destructive" }));
               } else toast({ title: error.message, variant: "destructive" });
            },
         }),
      });

   const [queryClient] = useState(queryInstance);

   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
