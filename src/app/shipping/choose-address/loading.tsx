import { Skeleton } from "@root/components/ui";

export default function AddressLoading() {
   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Choose an address</h1>
         <section className="grid sm:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
               <Skeleton key={`loading-address-${idx + 1}`} className="bg-custom h-52 space-y-2" />
            ))}
         </section>
      </main>
   );
}
