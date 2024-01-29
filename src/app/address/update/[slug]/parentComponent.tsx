"use client";

import { AddressForm } from "@root/components/custom";
import { useGetAddress } from "@root/hooks";
import Loading from "./loading";

export default function ParentComponent({ id, token }: { id: string; token: string }) {
   const { data: response } = useGetAddress({ enabled: !!token, id, token });

   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Update Address</h1>
         {response?.data ? <AddressForm {...response.data.address} token={token} /> : <Loading />}
      </main>
   );
}
