"use client";

import { useMutation } from "@tanstack/react-query";

import type { AuthenticateUser, UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function userSignup(values: unknown) {
   const res = await axiosClient.post<AuthenticateUser>("/auth/signup", values);
   return res.data;
}

export default function useSignup({ onSuccess, onError }: UseMutationArgs) {
   return useMutation({
      mutationFn: (values: unknown) => userSignup(values),
      onSuccess,
      onError,
   });
}
