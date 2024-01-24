"use client";

import { useGetAddress } from "@root/hooks";
import AddressForm from "../../addressForm";
import Loading from "@root/app/loading";

export default function ParentComponent({ id, token }: { id: string; token: string }) {
   const { data: response } = useGetAddress({ enabled: !!token, id, token });
   if (!response?.data) return <Loading />;
   const { data } = response;

   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Update Address</h1>
         <AddressForm {...data.address} token={token} />
      </main>
   );
}
