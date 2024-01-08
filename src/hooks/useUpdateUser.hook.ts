"use client";

import { useMutation } from "@tanstack/react-query";

import type { AuthenticateUser, UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function updateUser({ values, token }: { values: { [key: string]: string }; token: string }) {
   const res = await axiosClient.put<AuthenticateUser>("/user", values, { headers: { Authorization: `Bearer ${token}` } });
   return res.data;
}

export default function useUpdateUser({ onSuccess, onError }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ values, token }: { values: { [key: string]: string }; token: string }) => updateUser({ values, token }),
      onSuccess,
      onError,
   });
}
