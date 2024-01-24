"use client";

import { useQuery } from "@tanstack/react-query";

import { type AllAddressResponseType, allAddressResponseSchema } from "@root/validations";
import { getAllAddressQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getAllAddress({ token }: { token: string }) {
   const res = await axiosClient.get<AllAddressResponseType>("address/all", {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = allAddressResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetAllAddress({ enabled, token }: { enabled: boolean; token: string }) {
   return useQuery({
      queryKey: [getAllAddressQueryKey],
      queryFn: () => getAllAddress({ token }),
      enabled,
   });
}
