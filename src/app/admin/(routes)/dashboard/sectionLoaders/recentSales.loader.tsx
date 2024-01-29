import { Skeleton } from "@root/components/ui";

export default function RecentSalesLoader() {
   return Array.from({ length: 5 }).map((_, idx) => (
      <div key={`Recent Sales loader ${idx + 1}`} className="flex flex-wrap gap-4 items-center py-3 first:pt-0 last:pb-0">
         <Skeleton className="rounded-full w-10 h-10 bg-custom-marker" />
         <div className="space-y-1">
            <Skeleton className="w-56 h-4 bg-custom-marker" />
            <Skeleton className="w-56 h-4 bg-custom-marker" />
         </div>
         <Skeleton className="ml-auto w-16 h-6 bg-custom-marker" />
      </div>
   ));
}
