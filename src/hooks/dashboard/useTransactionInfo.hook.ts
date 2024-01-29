"use client";

import { useQuery } from "@tanstack/react-query";

import { transactionInfoSchema, type TransactionInfoType } from "@root/validations";
import { getTransactionInfoQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getTransactionInfo({ token }: { token: string }) {
   const res = await axiosClient.get<TransactionInfoType>("order/admin/transaction-info", {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = transactionInfoSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useTransactionInfo({ enabled, token }: { enabled: boolean; token: string }) {
   return useQuery({
      queryKey: [getTransactionInfoQueryKey],
      queryFn: () => getTransactionInfo({ token }),
      enabled,
   });
}
