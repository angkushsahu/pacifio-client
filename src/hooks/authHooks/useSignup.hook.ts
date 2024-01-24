"use client";

import { useMutation } from "@tanstack/react-query";

import { authenticatedUserSchema, type AuthenticateUserType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function userSignup(values: unknown) {
   const res = await axiosClient.post<AuthenticateUserType>("/auth/signup", values);

   const parsedResponse = authenticatedUserSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useSignup({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: (values: unknown) => userSignup(values),
      onSuccess,
   });
}
