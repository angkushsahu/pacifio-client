"use client";

import { useMutation } from "@tanstack/react-query";

import { reviewResponseSchema, type ReviewResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function addReview({ values, token }: { values: unknown; token: string }) {
   const res = await axiosClient.post<ReviewResponseType>(`/review/add`, values, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = reviewResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useAddReview({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ values, token }: { values: unknown; token: string }) => addReview({ values, token }),
      onSuccess,
   });
}
