import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import TransactionInfo from "./transactionInfo";
import { loginUrl } from "@root/constants";
import RecentSales from "./recentSales";
import SalesChart from "./salesChart";
import AppInfo from "./appInfo";

export const metadata: Metadata = {
   title: "Admin Dashboard - Pacifio",
};

export default async function AdminDashboard() {
   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);
   const { token } = session;

   return (
      <div>
         <h1 className="font-semibold text-3xl mb-6">Admin Dashboard</h1>
         <section className="grid gap-6 lg:grid-cols-2 my-6">
            <TransactionInfo token={token} />
            <RecentSales token={token} />
         </section>
         <AppInfo token={token} />
         <SalesChart token={token} />
      </div>
   );
}
