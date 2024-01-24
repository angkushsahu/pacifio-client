"use client";

import { useMutation } from "@tanstack/react-query";

import { responseSchema, type ResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function resetPassword(values: unknown) {
   const res = await axiosClient.post<ResponseType>("/auth/reset-password", values);

   const parsedResponse = responseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useResetPassword({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: (values: unknown) => resetPassword(values),
      onSuccess,
   });
}
