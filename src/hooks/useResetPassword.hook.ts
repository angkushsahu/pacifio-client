"use client";

import { useMutation } from "@tanstack/react-query";

import type { ResponseData, UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function resetPassword(values: unknown) {
   const res = await axiosClient.post<ResponseData>("/auth/reset-password", values);
   return res.data;
}

export default function useResetPassword({ onSuccess, onError }: UseMutationArgs) {
   return useMutation({
      mutationFn: (values: unknown) => resetPassword(values),
      onSuccess,
      onError,
   });
}
