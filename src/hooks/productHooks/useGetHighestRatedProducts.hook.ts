"use client";

import { useQuery } from "@tanstack/react-query";

import { type AllProductsResponseType, allProductsResponseSchema } from "@root/validations";
import { getHighestRatedProductsQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getHighestRatedProducts() {
   const res = await axiosClient.get<AllProductsResponseType>("/product/highest-rated");

   const parsedResponse = allProductsResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Server is down");
}

export default function useGetHighestRatedProducts() {
   return useQuery({
      queryKey: [getHighestRatedProductsQueryKey],
      queryFn: getHighestRatedProducts,
   });
}
