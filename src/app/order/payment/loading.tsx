import { Info } from "lucide-react";

import { Alert, AlertDescription, AlertTitle, Skeleton } from "@root/components/ui";

export default function PaymentLoading() {
   return (
      <main className="min-h-section grid place-content-center grid-cols-1 max-w-xl mx-auto px-5 pt-8 pb-12">
         <Alert className="shadow-md bg-muted">
            <Info className="h-4 w-4" />
            <AlertTitle className="mb-2">Important</AlertTitle>
            <AlertDescription>
               You can enter your card details freely. We do not intend to deduct money or save your card details.
            </AlertDescription>
         </Alert>
         <h1 className="font-semibold text-3xl my-6">Payment</h1>
         <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, idx) => (
               <div key={`Payment card loading ${idx + 1}`} className="space-y-2">
                  <Skeleton className="bg-custom-marker h-5 w-24" />
                  <Skeleton className="bg-custom-marker h-10 w-full" />
                  <Skeleton className="bg-custom-marker h-5 w-80" />
               </div>
            ))}
            <Skeleton className="bg-black h-10 w-full mt-5 rounded-none" />
         </div>
      </main>
   );
}
