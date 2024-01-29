import { Skeleton } from "@root/components/ui";

export default function AllOrdersLoading() {
   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Your Order History</h1>
         <section className="grid sm:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
               <article key={`Order box ${idx}`} className="bg-custom hover:bg-custom-hover p-5 shadow-md">
                  <Skeleton className="h-7 w-80 bg-custom-marker" />
                  <div>
                     {Array.from({ length: 3 }).map((_, idx) => (
                        <Skeleton key={`Item Loading ${idx + 1}`} className="h-6 w-80 bg-custom-marker my-2" />
                     ))}
                  </div>
                  <Skeleton className="h-7 w-24 bg-custom-marker" />
                  <Skeleton className="h-7 w-24 bg-custom-marker mt-3" />
               </article>
            ))}
         </section>
      </main>
   );
}
