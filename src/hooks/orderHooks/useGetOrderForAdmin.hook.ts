"use client";

import { useQuery } from "@tanstack/react-query";

import { type OrderResponseType, orderResponseSchema } from "@root/validations";
import { getOrderQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getOrderForAdmin({ token, orderId }: { token: string; orderId: string }) {
   const res = await axiosClient.get<OrderResponseType>(`/order/admin/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = orderResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetOrderForAdmin({ enabled, token, orderId }: { enabled: boolean; token: string; orderId: string }) {
   return useQuery({
      queryKey: [getOrderQueryKey, orderId],
      queryFn: () => getOrderForAdmin({ token, orderId }),
      enabled,
   });
}
