"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { allOrdersResponseSchema, type AllOrdersResponseType } from "@root/validations";
import { getAllOrdersQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getAllOrders({ pageParam, token }: { pageParam: number; token: string }) {
   const res = await axiosClient.get<AllOrdersResponseType>(`/order/all?page=${pageParam}`, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = allOrdersResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetAllOrders({ token }: { token: string }) {
   return useInfiniteQuery({
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
         (lastPage as AllOrdersResponseType).data.orders.length ? allPages.length + 1 : undefined,
      queryKey: [getAllOrdersQueryKey],
      queryFn: ({ pageParam }) => getAllOrders({ pageParam, token } as { pageParam: number; token: string }),
   });
}
