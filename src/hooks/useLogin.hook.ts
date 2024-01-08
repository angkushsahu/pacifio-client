"use client";

import { useMutation } from "@tanstack/react-query";

import type { AuthenticateUser, UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function userLogin(values: unknown) {
   const res = await axiosClient.post<AuthenticateUser>("/auth/login", values);
   return res.data;
}

export default function useLogin({ onSuccess, onError }: UseMutationArgs) {
   return useMutation({
      mutationFn: (values: unknown) => userLogin(values),
      onSuccess,
      onError,
   });
}
