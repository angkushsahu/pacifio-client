"use client";

import { useQuery } from "@tanstack/react-query";

import { AddressResponseType, addressResponseSchema } from "@root/validations";
import { getAddressQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getAddress({ id, token }: { token: string; id: string }) {
   const res = await axiosClient.get<AddressResponseType>(`address/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = addressResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetAddress({ enabled, token, id }: { enabled: boolean; id: string; token: string }) {
   return useQuery({
      queryKey: [getAddressQueryKey, id],
      queryFn: () => getAddress({ token, id }),
      enabled,
   });
}
