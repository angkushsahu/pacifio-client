"use client";

import { useMutation } from "@tanstack/react-query";

import { shoppingBagResponseSchema, type ShoppingBagResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function removeFromBag({ productId, token }: { productId: string; token: string }) {
   const res = await axiosClient.delete<ShoppingBagResponseType>(`/shopping-bag/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = shoppingBagResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useRemoveFromBag({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ productId, token }: { productId: string; token: string }) => removeFromBag({ productId, token }),
      onSuccess,
   });
}
