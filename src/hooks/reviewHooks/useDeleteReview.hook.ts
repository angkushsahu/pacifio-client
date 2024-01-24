"use client";

import { useMutation } from "@tanstack/react-query";

import { responseSchema, type ResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function deleteReview({ token, productId }: { token: string; productId: string }) {
   const res = await axiosClient.delete<ResponseType>(`/review/${productId}`, { headers: { Authorization: `Bearer ${token}` } });

   const parsedResponse = responseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useDeleteReview({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ token, productId }: { token: string; productId: string }) => deleteReview({ token, productId }),
      onSuccess,
   });
}
