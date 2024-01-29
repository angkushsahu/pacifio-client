"use client";

import { useQuery } from "@tanstack/react-query";

import { type SalesGraphType, salesGraphSchema } from "@root/validations";
import { getGraphDataQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getSalesGraph({ token }: { token: string }) {
   const res = await axiosClient.get<SalesGraphType>("order/admin/graph-data", { headers: { Authorization: `Bearer ${token}` } });

   const parsedResponse = salesGraphSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useSalesGraph({ enabled, token }: { enabled: boolean; token: string }) {
   return useQuery({
      queryKey: [getGraphDataQueryKey],
      queryFn: () => getSalesGraph({ token }),
      enabled,
   });
}
