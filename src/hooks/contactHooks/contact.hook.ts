"use client";

import { useMutation } from "@tanstack/react-query";

import { responseSchema, type ResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function sendMail(values: unknown) {
   const res = await axiosClient.post<ResponseType>("/contact", values);

   const parsedResponse = responseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useSendMail({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: (values: unknown) => sendMail(values),
      onSuccess,
   });
}
