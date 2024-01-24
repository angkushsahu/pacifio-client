import Link from "next/link";

import { homeUrl } from "@root/constants";
import { Button } from "@root/components/ui";
import EmptyOrders from "./emptyOrders";
import OrderBox from "./orderBox";

export default function ParentComponent() {
   const areOrdersEmpty = false;

   if (areOrdersEmpty) return <EmptyOrders />;

   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Your Order History</h1>
         <section className="grid sm:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-8">
            {Array.from({ length: 5 }).map((_, idx) => (
               <OrderBox key={`Order-${idx + 1}`} />
            ))}
         </section>
         <div className="flex flex-col items-end mt-12">
            <Link href={homeUrl} className="w-full sm:w-auto">
               <Button className="w-full">Continue Shopping</Button>
            </Link>
         </div>
      </main>
   );
}
