"use client";

import { useMutation } from "@tanstack/react-query";

import { orderResponseSchema, type OrderResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function createOrder({ values, token }: { values: unknown; token: string }) {
   const res = await axiosClient.post<OrderResponseType>("/order/create", values, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = orderResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useCreateOrder({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ values, token }: { values: unknown; token: string }) => createOrder({ values, token }),
      onSuccess,
   });
}
