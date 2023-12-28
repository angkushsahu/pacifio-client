import { Skeleton } from "@root/components/ui";

export default function LoadingProducts() {
   return (
      <main className="min-h-section center-layout pt-6 pb-12 px-4">
         <h1 className="mb-6">Here are your results ....</h1>
         <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-12 sm:gap-10">
            {Array.from({ length: 6 }).map((_, idx) => (
               <article key={"Product loader" + idx}>
                  <Skeleton className="h-80 bg-custom" />
                  <Skeleton className="mt-5 mb-2 h-7 bg-custom" />
                  <div className="flex">
                     <div className="flex-1">
                        <Skeleton className="w-24 h-6 bg-custom mb-2" />
                        <Skeleton className="w-24 h-6 bg-custom" />
                     </div>
                     <div>
                        <Skeleton className="w-24 h-6 bg-custom mb-2" />
                        <Skeleton className="w-24 h-6 bg-custom" />
                     </div>
                  </div>
               </article>
            ))}
         </div>
      </main>
   );
}
