"use client";

import { useQuery } from "@tanstack/react-query";

import { orderInfoSchema, type OrderInfoType } from "@root/validations";
import { getOrderInfoQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getOrderInfo({ token }: { token: string }) {
   const res = await axiosClient.get<OrderInfoType>("order/admin/info", {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = orderInfoSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetOrderInfo({ enabled, token }: { enabled: boolean; token: string }) {
   return useQuery({
      queryKey: [getOrderInfoQueryKey],
      queryFn: () => getOrderInfo({ token }),
      enabled,
   });
}
