"use client";

import Link from "next/link";

import type { AllOrdersResponseType } from "@root/validations";
import { useGetAllOrders } from "@root/hooks";
import { Button } from "@root/components/ui";
import { homeUrl } from "@root/constants";
import EmptyOrders from "./emptyOrders";
import OrderBox from "./orderBox";
import Loading from "./loading";

export default function ParentComponent({ token }: { token: string }) {
   const { data: response, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetAllOrders({ token });
   if (!response) return <Loading />;
   if (!(response?.pages[0] as AllOrdersResponseType)?.data?.numberOfFetchedOrders) return <EmptyOrders />;

   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Your Order History</h1>
         <section className="grid sm:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-8">
            {response?.pages
               .flatMap((page) => (page as AllOrdersResponseType).data.orders)
               .flatMap((order) => order)
               .map((order, idx) => <OrderBox key={`Order-${idx + 1}`} {...order} />)}
         </section>
         <div className="flex flex-col items-end mt-12">
            {hasNextPage &&
            (response?.pages[response.pages.length - 1] as AllOrdersResponseType).data.numberOfFetchedOrders <
               (response?.pages[response.pages.length - 1] as AllOrdersResponseType).data.totalOrders ? (
               <div className="text-center mt-12">
                  <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                     Load More ....
                  </Button>
               </div>
            ) : null}
            <Link href={homeUrl} className="w-full sm:w-auto">
               <Button className="w-full">Continue Shopping</Button>
            </Link>
         </div>
      </main>
   );
}
