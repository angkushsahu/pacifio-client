"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { allProductsResponseSchema, type AllProductsResponseType } from "@root/validations";
import { getAllProductsQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getAllProducts({ pageParam, searchParams }: { pageParam: number; searchParams: string }) {
   const res = await axiosClient.get<AllProductsResponseType>(`/product/all?${searchParams}&page=${pageParam}`);

   const parsedResponse = allProductsResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetAllProducts({ searchParams }: { searchParams: string }) {
   return useInfiniteQuery({
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
         const { totalPages } = (lastPage as AllProductsResponseType).data;
         return allPages.length < totalPages ? allPages.length + 1 : undefined;
      },
      queryKey: [getAllProductsQueryKey],
      queryFn: ({ pageParam }) => getAllProducts({ pageParam, searchParams } as { pageParam: number; searchParams: string }),
   });
}
