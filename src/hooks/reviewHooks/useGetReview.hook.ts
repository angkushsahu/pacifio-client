"use client";

import { useQuery } from "@tanstack/react-query";

import { reviewResponseSchema, type ReviewResponseType } from "@root/validations";
import { getReviewQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getReview({ token, productId }: { token: string; productId: string }) {
   const res = await axiosClient.get<ReviewResponseType>(`/review/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = reviewResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetReview({ enabled, token, productId }: { enabled: boolean; token: string; productId: string }) {
   return useQuery({
      queryKey: [getReviewQueryKey, productId],
      queryFn: () => getReview({ token, productId }),
      enabled,
   });
}
