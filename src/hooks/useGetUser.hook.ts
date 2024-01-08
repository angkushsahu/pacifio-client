"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserQueryKey } from "@root/constants/queryKeys";
import type { AuthenticateUser } from "@root/types";
import { axiosClient } from "@root/lib";

export async function getUser({ token }: { token: string }) {
   const res = await axiosClient.get<AuthenticateUser>("/user", { headers: { Authorization: `Bearer ${token}` } });
   return res.data;
}

export default function useGetUser({ enabled, token }: { enabled: boolean; token: string }) {
   return useQuery({
      queryKey: [getUserQueryKey],
      queryFn: () => getUser({ token }),
      enabled,
   });
}
