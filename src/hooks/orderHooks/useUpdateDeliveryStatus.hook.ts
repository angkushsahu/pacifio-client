"use client";

import { useMutation } from "@tanstack/react-query";

import { type OrderResponseType, orderResponseSchema } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export interface IArgs {
   token: string;
   orderId: string;
}

export async function updateDeliveryStatus({ token, orderId }: IArgs) {
   const res = await axiosClient.put<OrderResponseType>(`/order/admin/${orderId}/update-delivery-status`, null, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = orderResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useUpdateDeliveryStatus({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ token, orderId }: IArgs) => updateDeliveryStatus({ token, orderId }),
      onSuccess,
   });
}
