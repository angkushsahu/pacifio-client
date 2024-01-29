"use client";

import { redirect } from "next/navigation";

import { createAddressUrl } from "@root/constants";
import { useGetAllAddress } from "@root/hooks";
import ShowAllAddress from "./showAllAddress";
import Loading from "./loading";

export default function ParentComponent({ token }: { token: string }) {
   const { data: response } = useGetAllAddress({ enabled: true, token });
   if (!response) return <Loading />;
   const { data } = response;
   if (data.totalAddresses <= 0) redirect(`${createAddressUrl}?shipping=true`);

   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Choose an address</h1>
         <ShowAllAddress addresses={data.addresses} token={token} />
      </main>
   );
}
