import { Skeleton } from "@root/components/ui";

export default function Loading() {
   return (
      <main className="min-h-section center-layout py-8 px-4">
         <section className="flex flex-col lg:flex-row gap-10">
            <section className="flex-1">
               <Skeleton className="h-96 w-full" />
            </section>
            <section className="flex-1">
               <Skeleton className="h-16 w-full mb-2" />
               <Skeleton className="h-7 w-16" />
               <Skeleton className="h-7 w-24 mt-4 mb-1" />
               <Skeleton className="h-7 w-48" />
               <div className="flex items-center gap-x-6 mt-6">
                  <Skeleton className="w-40 h-10" />
                  <Skeleton className="w-40 h-10" />
               </div>
               <Skeleton className="h-20 w-full mt-8" />
               <Skeleton className="h-20 w-full my-5" />
               <Skeleton className="h-20 w-full my-5" />
               <Skeleton className="h-20 w-full my-5" />
            </section>
         </section>
      </main>
   );
}
