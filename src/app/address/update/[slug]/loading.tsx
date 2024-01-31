import { Skeleton } from "@root/components/ui";

export default function AddressLoading() {
   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Update Address</h1>
         <div className="space-y-5">
            {Array.from({ length: 6 }).map((_, idx) => (
               <div key={`Address loading ${idx + 1}`} className="space-y-2">
                  <Skeleton className="bg-custom-marker h-5 w-24" />
                  <Skeleton className="bg-custom-marker h-10 w-full" />
               </div>
            ))}
            <Skeleton className="bg-black h-10 w-full mt-5 rounded-none" />
         </div>
      </main>
   );
}
