"use client";

import { Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";

import {
   adminDeliveredOrdersUrl,
   adminInStockProductsUrl,
   adminOutOfStockProductsUrl,
   adminProcessingOrdersUrl,
   adminShippedOrdersUrl,
   adminUserRoleAdminUrl,
   adminUserRoleRegularUrl,
} from "@root/constants";
import { Card, CardContent, CardHeader, CardTitle, Separator, Skeleton } from "@root/components/ui";
import { useOrderInfo, useProductInfo, useUserInfo } from "@root/hooks";
import { formatNumber } from "@root/lib";

export default function AppInfo({ token }: { token: string }) {
   const { data: productInfo } = useProductInfo({ enabled: true, token });
   const { data: orderInfo } = useOrderInfo({ enabled: true, token });
   const { data: userInfo } = useUserInfo({ enabled: true, token });

   const appInfoContent = [
      {
         title: "Products",
         Icon: ShoppingCart,
         totalValue: formatNumber(productInfo?.data.totalProducts || 0),
         subDocuments: [
            {
               title: "In Stock",
               totalValue: formatNumber(productInfo?.data.productGroup.inStock || 0),
               link: adminInStockProductsUrl,
            },
            {
               title: "Out of Stock",
               totalValue: formatNumber(productInfo?.data.productGroup.outOfStock || 0),
               link: adminOutOfStockProductsUrl,
            },
         ],
      },
      {
         title: "Users",
         Icon: Users,
         totalValue: formatNumber(userInfo?.data.totalUsers || 0),
         subDocuments: [
            { title: "Regular", totalValue: formatNumber(userInfo?.data.userGroup.user || 0), link: adminUserRoleRegularUrl },
            { title: "Admin", totalValue: formatNumber(userInfo?.data.userGroup.admin || 0), link: adminUserRoleAdminUrl },
            { title: "Super-Admin", totalValue: formatNumber(userInfo?.data.userGroup["super-admin"] || 0), link: "" },
         ],
      },
      {
         title: "Orders",
         Icon: Package,
         totalValue: formatNumber(orderInfo?.data.totalOrders || 0),
         subDocuments: [
            {
               title: "Processing",
               totalValue: formatNumber(orderInfo?.data.orderGroup.processing || 0),
               link: adminProcessingOrdersUrl,
            },
            { title: "Shipping", totalValue: formatNumber(orderInfo?.data.orderGroup.shipped || 0), link: adminShippedOrdersUrl },
            {
               title: "Delivered",
               totalValue: formatNumber(orderInfo?.data.orderGroup.delivered || 0),
               link: adminDeliveredOrdersUrl,
            },
         ],
      },
   ];

   return (
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 my-6">
         {appInfoContent.map((info) => (
            <Card key={info.title} className="bg-custom shadow-md">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                     <CardTitle className="text-lg font-medium mb-1">{info.title}</CardTitle>
                     {!productInfo || !userInfo || !orderInfo ? (
                        <Skeleton className="h-8 w-20 bg-custom-marker" />
                     ) : (
                        <div className="text-2xl font-bold">{info.totalValue}</div>
                     )}
                  </div>
                  <div className="p-3 rounded-md bg-custom-marker inline-block">
                     <info.Icon className="h-6 w-6 text-custom-foreground" />
                  </div>
               </CardHeader>
               <CardContent>
                  <Separator className="bg-neutral-300 my-4" />
                  <div>
                     {info.subDocuments.map((doc) =>
                        doc.link ? (
                           <Link key={doc.title} href={doc.link}>
                              <div className="flex items-center justify-between hover:bg-custom-hover px-3 py-1">
                                 <span>{doc.title}</span>
                                 {!productInfo || !userInfo || !orderInfo ? (
                                    <Skeleton className="h-6 w-16 bg-custom-marker" />
                                 ) : (
                                    <span className="font-medium">{doc.totalValue}</span>
                                 )}
                              </div>
                           </Link>
                        ) : (
                           <div key={doc.title} className="flex items-center justify-between px-3 py-1">
                              <span>{doc.title}</span>
                              {!productInfo || !userInfo || !orderInfo ? (
                                 <Skeleton className="h-6 w-16 bg-custom-marker" />
                              ) : (
                                 <span className="font-medium">{doc.totalValue}</span>
                              )}
                           </div>
                        )
                     )}
                  </div>
               </CardContent>
            </Card>
         ))}
      </section>
   );
}
