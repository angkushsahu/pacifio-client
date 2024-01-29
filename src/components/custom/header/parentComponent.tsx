"use client";

import type { PropsWithChildren } from "react";

import { useGetMyAccount } from "@root/hooks";
import NavAndSearch from "./navAndSearch";
import NavLinks from "./navLinks";

export interface ParentComponentProps extends PropsWithChildren {
   token: string | undefined;
}

export default function ParentComponent({ children, token }: ParentComponentProps) {
   const { data: response } = useGetMyAccount({ enabled: !!token, token: token as string });

   return (
      <>
         <NavAndSearch user={response?.data.user} />
         {children}
         <NavLinks user={response?.data.user} token={token} />
      </>
   );
}
