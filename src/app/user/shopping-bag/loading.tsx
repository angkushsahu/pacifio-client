import { Skeleton } from "@root/components/ui";

function SummaryLoading() {
   return (
      <div className="flex items-center justify-between my-5">
         <Skeleton className="w-20 h-10" />
         <Skeleton className="w-20 h-10" />
      </div>
   );
}

export default function LoadingShoppingBag() {
   return (
      <main className="min-h-section center-layout px-5 py-8">
         <h1 className="font-semibold text-3xl mb-6">Shopping Bag</h1>
         <SummaryLoading />
         <section className="border-y-[1px] border-custom-light divide-y-[1px] divide-custom-light">
            <article className="py-5 flex flex-col sm:flex-row gap-x-5">
               <Skeleton className="sm:w-60 h-48 flex items-center justify-center" />
               <section className="flex-1 flex flex-col lg:flex-row gap-x-5">
                  <div className="flex-1 mt-4 sm:mt-0">
                     <Skeleton className="h-10 w-full sm:w-80" />
                     <Skeleton className="mt-2 h-10 w-40" />
                     <Skeleton className="my-4 h-10 w-40" />
                  </div>
                  <div className="flex flex-col justify-between">
                     <Skeleton className="h-10 w-28 mb-3" />
                     <Skeleton className="h-10 w-28" />
                  </div>
               </section>
            </article>
         </section>
         <SummaryLoading />
      </main>
   );
}
