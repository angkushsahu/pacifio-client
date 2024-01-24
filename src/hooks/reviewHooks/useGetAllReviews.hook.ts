"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { allReviewResponseSchema, type AllReviewResponseType } from "@root/validations";
import { getAllReviewsQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getAllReviews({ pageParam, productId }: { pageParam: number; productId: string }) {
   const res = await axiosClient.get<AllReviewResponseType>(`/review/${productId}/all?page=${pageParam}`);

   const parsedResponse = allReviewResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetAllReviews({ productId }: { productId: string }) {
   return useInfiniteQuery({
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
         (lastPage as AllReviewResponseType).data.reviews.length ? allPages.length + 1 : undefined,
      queryKey: [getAllReviewsQueryKey, productId],
      queryFn: ({ pageParam }) => getAllReviews({ pageParam, productId } as { pageParam: number; productId: string }),
   });
}
