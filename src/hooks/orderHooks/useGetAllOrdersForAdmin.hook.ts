"use client";

import { useQuery } from "@tanstack/react-query";

import { allOrdersResponseSchema, type AllOrdersResponseType } from "@root/validations";
import { getAllOrdersForAdminQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export interface IArgs {
   pageNumber: number;
   token: string;
   query: string;
   status: "processing" | "shipped" | "delivered";
}

export async function getAllOrdersForAdmin({ pageNumber, query, status, token }: IArgs) {
   const res = await axiosClient.get<AllOrdersResponseType>(
      `/order/admin/all?page=${pageNumber}&query=${query}&status=${status}`,
      {
         headers: { Authorization: `Bearer ${token}` },
      }
   );

   const parsedResponse = allOrdersResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetAllOrdersForAdmin({ pageNumber, query, status, token }: IArgs) {
   return useQuery({
      queryKey: [getAllOrdersForAdminQueryKey, pageNumber, query, status],
      queryFn: () => getAllOrdersForAdmin({ pageNumber, query, status, token }),
   });
}
