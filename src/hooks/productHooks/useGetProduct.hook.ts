"use client";

import { useQuery } from "@tanstack/react-query";

import { productResponseSchema, type ProductResponseType } from "@root/validations";
import { getProductQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getProduct({ id }: { id: string }) {
   const res = await axiosClient.get<ProductResponseType>(`/product/${id}`);

   const parsedResponse = productResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetProduct({ enabled, id }: { enabled: boolean; id: string }) {
   return useQuery({
      queryKey: [getProductQueryKey, id],
      queryFn: () => getProduct({ id }),
      enabled,
   });
}
