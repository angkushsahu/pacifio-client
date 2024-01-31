import { Skeleton } from "@root/components/ui";

export default function UserInfoLoading() {
   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12 flex flex-col justify-center">
         <h1 className="font-semibold text-3xl mb-6">Update Account</h1>
         <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, idx) => (
               <div key={`User info loading ${idx + 1}`} className="space-y-2">
                  <Skeleton className="bg-custom-marker h-5 w-24" />
                  <Skeleton className="bg-custom-marker h-10 w-full" />
               </div>
            ))}
            <Skeleton className="bg-black h-10 w-full mt-5 rounded-none" />
         </div>
      </main>
   );
}
