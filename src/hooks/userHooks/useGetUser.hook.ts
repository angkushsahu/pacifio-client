"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserSchema, type GetUserType } from "@root/validations";
import { getUserQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getUser({ token, userId }: { token: string; userId: string }) {
   const res = await axiosClient.get<GetUserType>(`/user/admin/${userId}`, { headers: { Authorization: `Bearer ${token}` } });

   const parsedResponse = getUserSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetUser({ enabled, token, userId }: { enabled: boolean; token: string; userId: string }) {
   return useQuery({
      queryKey: [getUserQueryKey, userId],
      queryFn: () => getUser({ token, userId }),
      enabled,
   });
}
