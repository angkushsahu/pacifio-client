"use client";

import { useQuery } from "@tanstack/react-query";

import { type AllProductsResponseType, allProductsResponseSchema } from "@root/validations";
import { getAllProductsForAdminQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export interface IArgs {
   pageNumber: number;
   token: string;
   stock: "true" | "false";
   query: string;
}

export async function getAllProductsForAdmin({ pageNumber, query, stock, token }: IArgs) {
   const res = await axiosClient.get<AllProductsResponseType>(
      `/product/admin/all?page=${pageNumber}&query=${query}&stock=${stock}`,
      {
         headers: { Authorization: `Bearer ${token}` },
      }
   );

   const parsedResponse = allProductsResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetAllProductsForAdmin({ pageNumber, query, stock, token }: IArgs) {
   return useQuery({
      queryKey: [getAllProductsForAdminQueryKey, pageNumber, query, stock],
      queryFn: () => getAllProductsForAdmin({ pageNumber, query, stock, token }),
   });
}
