"use client";

import { useQuery } from "@tanstack/react-query";

import { recentSalesSchema, type RecentSalesType } from "@root/validations";
import { getRecentSalesQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getRecentSales({ token }: { token: string }) {
   const res = await axiosClient.get<RecentSalesType>("order/admin/recent", { headers: { Authorization: `Bearer ${token}` } });

   const parsedResponse = recentSalesSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useRecentSales({ enabled, token }: { enabled: boolean; token: string }) {
   return useQuery({
      queryKey: [getRecentSalesQueryKey],
      queryFn: () => getRecentSales({ token }),
      enabled,
   });
}
