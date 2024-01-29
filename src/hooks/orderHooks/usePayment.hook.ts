"use client";

import { useMutation } from "@tanstack/react-query";

import { orderResponseSchema, type OrderResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function payment({ token, orderId }: { token: string; orderId: string }) {
   const res = await axiosClient.post<OrderResponseType>(`/order/payment/${orderId}`, null, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = orderResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function usePayment({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ token, orderId }: { token: string; orderId: string }) => payment({ token, orderId }),
      onSuccess,
   });
}
