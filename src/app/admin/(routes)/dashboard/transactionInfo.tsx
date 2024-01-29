"use client";

import { BadgeIndianRupee, CreditCard, IndianRupee } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@root/components/ui";
import { useTransactionInfo } from "@root/hooks";
import { formatNumber } from "@root/lib";

export default function Transactions({ token }: { token: string }) {
   const { data: transactionInfo } = useTransactionInfo({ enabled: true, token });

   const transactionItems = [
      { title: "Total Sales", amount: `₹ ${formatNumber(transactionInfo?.data.totalSales || 0)}`, Icon: IndianRupee },
      { title: "Total Transactions", amount: `${formatNumber(transactionInfo?.data.totalTransactions || 0)}`, Icon: CreditCard },
      {
         title: "Average Sales",
         amount: `₹ ${formatNumber(transactionInfo?.data.averageTransactions || 0)}`,
         Icon: BadgeIndianRupee,
      },
   ];

   return (
      <div className="space-y-6">
         {transactionItems.map((item) => (
            <Card key={item.title} className="bg-custom shadow-md">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                     <CardTitle className="text-lg font-medium mb-1">{item.title}</CardTitle>
                     {transactionInfo?.data.totalSales &&
                     transactionInfo.data.averageTransactions &&
                     transactionInfo.data.totalTransactions ? (
                        <div className="text-2xl font-bold">{item.amount}</div>
                     ) : (
                        <Skeleton className="bg-custom-marker w-72 h-10" />
                     )}
                  </div>
                  <div className="p-3 rounded-md bg-custom-marker inline-block">
                     <item.Icon className="h-6 w-6 text-custom-foreground" />
                  </div>
               </CardHeader>
               <CardContent></CardContent>
            </Card>
         ))}
      </div>
   );
}
