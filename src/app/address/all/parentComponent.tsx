"use client";

import { useGetAllAddress } from "@root/hooks";
import ShowAllAddress from "./showAllAddress";
import EmptyAddress from "./emptyAddress";
import Loading from "./loading";

export interface ParentComponentProps {
   userId: string;
   token: string;
}

export default function ParentComponent({ token, userId }: ParentComponentProps) {
   const { data: response } = useGetAllAddress({ enabled: !!userId, token });
   if (!response) return <Loading />;
   const { data } = response;
   if (data.totalAddresses <= 0) return <EmptyAddress />;

   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Saved addresses</h1>
         <ShowAllAddress addresses={data.addresses} token={token} />
      </main>
   );
}
