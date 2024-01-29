import { Skeleton } from "@root/components/ui";

export default function PaymentLoading() {
   return (
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
   );
}
