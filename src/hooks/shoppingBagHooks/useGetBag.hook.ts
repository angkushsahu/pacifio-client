"use client";

import { useQuery } from "@tanstack/react-query";

import { shoppingBagResponseSchema, type ShoppingBagResponseType } from "@root/validations";
import { getShoppingBagQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getShoppingBag({ token }: { token: string }) {
   const res = await axiosClient.get<ShoppingBagResponseType>("/shopping-bag", { headers: { Authorization: `Bearer ${token}` } });

   const parsedResponse = shoppingBagResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetShoppingBag({ enabled, token }: { enabled: boolean; token: string }) {
   return useQuery({
      queryKey: [getShoppingBagQueryKey],
      queryFn: () => getShoppingBag({ token }),
      enabled,
   });
}
