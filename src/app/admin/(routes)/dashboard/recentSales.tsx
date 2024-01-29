"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@root/components/ui";
import { formatNumber, userAvatarName } from "@root/lib";
import { baseAdminViewUserUrl } from "@root/constants";
import { RecentSalesLoader } from "./sectionLoaders";
import { useRecentSales } from "@root/hooks";

export default function RecentSales({ token }: { token: string }) {
   const { data: sales } = useRecentSales({ enabled: true, token });

   return (
      <Card className="bg-custom shadow-md">
         <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
               You made <span className="font-medium text-lg">₹ {formatNumber(sales?.data.totalPriceOfRecentSales || 0)}</span> in
               the last {formatNumber(sales?.data.totalOrders || 0)} transactions
            </CardDescription>
         </CardHeader>
         <CardContent className="divide-y-[1px] divide-neutral-300">
            {!sales ? (
               <RecentSalesLoader />
            ) : (
               sales.data?.orders?.map((order, idx) => (
                  <div
                     key={`Latest-transaction-${idx + 1}`}
                     className="flex flex-wrap gap-4 items-center py-3 first:pt-0 last:pb-0"
                  >
                     <Avatar>
                        <AvatarFallback className="bg-custom-marker">
                           <Link href={`${baseAdminViewUserUrl}/${order.user.id}`}>
                              {userAvatarName({ userName: order.user.name })}
                           </Link>
                        </AvatarFallback>
                     </Avatar>
                     <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                           <Link href={`${baseAdminViewUserUrl}/${order.user.id}`}>{order.user.name}</Link>
                        </p>
                        <p className="text-sm text-custom-foreground">
                           <Link href={`${baseAdminViewUserUrl}/${order.user.id}`}>{order.user.email}</Link>
                        </p>
                     </div>
                     <div className="ml-auto font-medium">₹ {formatNumber(order.totalPrice)}</div>
                  </div>
               ))
            )}
         </CardContent>
      </Card>
   );
}
