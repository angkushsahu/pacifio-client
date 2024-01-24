"use client";

import { useMutation } from "@tanstack/react-query";

import { shoppingBagResponseSchema, type ShoppingBagResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function addToBag({ values, token }: { values: unknown; token: string }) {
   const res = await axiosClient.post<ShoppingBagResponseType>(`/shopping-bag/add`, values, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = shoppingBagResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useAddToBag({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ values, token }: { values: unknown; token: string }) => addToBag({ values, token }),
      onSuccess,
   });
}
