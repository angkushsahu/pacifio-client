"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserSchema, type GetUserType } from "@root/validations";
import { getUserQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getMyAccount({ token }: { token: string }) {
   const res = await axiosClient.get<GetUserType>("/user", { headers: { Authorization: `Bearer ${token}` } });

   const parsedResponse = getUserSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetMyAccount({ enabled, token }: { enabled: boolean; token: string }) {
   return useQuery({
      queryKey: [getUserQueryKey],
      queryFn: () => getMyAccount({ token }),
      enabled,
   });
}
