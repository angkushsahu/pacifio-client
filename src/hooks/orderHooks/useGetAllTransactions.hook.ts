"use client";

import { useQuery } from "@tanstack/react-query";

import { allOrdersResponseSchema, type AllOrdersResponseType } from "@root/validations";
import { getAllOrdersForAdminQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export interface IArgs {
   pageNumber: number;
   token: string;
   query: string;
}

export async function getAllTransactions({ pageNumber, query, token }: IArgs) {
   const res = await axiosClient.get<AllOrdersResponseType>(`/order/admin/transactions/all?page=${pageNumber}&query=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = allOrdersResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetAllTransactions({ pageNumber, query, token }: IArgs) {
   return useQuery({
      queryKey: [getAllOrdersForAdminQueryKey, pageNumber, query],
      queryFn: () => getAllTransactions({ pageNumber, query, token }),
   });
}
