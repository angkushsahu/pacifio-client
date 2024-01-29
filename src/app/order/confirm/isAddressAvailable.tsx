"use client";

import { useRouter } from "next/navigation";

import ParentComponent from "./parentComponent";
import { shippingUrl } from "@root/constants";
import { useGetAddress } from "@root/hooks";
import Loading from "./loading";

export interface IsAddressAvailableProps {
   token: string;
   shippingId: string;
}

export default function IsAddressAvailable({ shippingId, token }: IsAddressAvailableProps) {
   const router = useRouter();
   const { data: response, isError } = useGetAddress({ enabled: true, id: shippingId, token });
   if (isError) router.replace(shippingUrl);
   if (!response) return <Loading />;

   return <ParentComponent token={token} shippingId={shippingId} enabled />;
}
