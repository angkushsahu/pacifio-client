import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import { loginUrl } from "@root/constants";
import UserInfo from "./userInfo";

export const metadata: Metadata = {
   title: "Update Account - Pacifio",
};

export default async function Update() {
   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return <UserInfo token={session.token} />;
}
