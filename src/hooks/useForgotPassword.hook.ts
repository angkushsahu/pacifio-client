"use client";

import { useMutation } from "@tanstack/react-query";

import type { ResponseData, UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function forgotPassword(values: unknown) {
   const res = await axiosClient.post<ResponseData>("/auth/forgot-password", values);
   return res.data;
}

export default function useForgotPassword({ onSuccess, onError }: UseMutationArgs) {
   return useMutation({
      mutationFn: (values: unknown) => forgotPassword(values),
      onSuccess,
      onError,
   });
}
