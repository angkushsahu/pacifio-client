import { getServerSession } from "next-auth";

import authOptions from "@root/app/api/auth/authOptions";
import type { ServerPageProps } from "@root/types";
import ParentComponent from "./parentComponent";

export default async function Product({ params }: ServerPageProps) {
   const { slug } = params;
   const session = await getServerSession(authOptions);

   return <ParentComponent slug={slug} token={session?.token} />;
}
