"use client";

import { useQuery } from "@tanstack/react-query";

import { productInfoSchema, type ProductInfoType } from "@root/validations";
import { getProductInfoQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getProductInfo({ token }: { token: string }) {
   const res = await axiosClient.get<ProductInfoType>("product/admin/info", {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = productInfoSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetProductInfo({ enabled, token }: { enabled: boolean; token: string }) {
   return useQuery({
      queryKey: [getProductInfoQueryKey],
      queryFn: () => getProductInfo({ token }),
      enabled,
   });
}
