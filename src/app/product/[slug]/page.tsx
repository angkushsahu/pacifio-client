import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import type { ServerPageProps } from "@root/types";
import ParentComponent from "./parentComponent";

export const metadata: Metadata = {
   title: "See Product - Pacifio",
};

export default async function Product({ params }: ServerPageProps) {
   const { slug } = params;
   const session = await getServerSession(authOptions);

   return <ParentComponent slug={slug} token={session?.token} />;
}
