import { Skeleton } from "@root/components/ui";

export default function SalesChartLoader() {
   return (
      <div className="h-[25rem] grid grid-cols-12 gap-x-2 sm:gap-x-6">
         {Array.from({ length: 12 }).map((_, idx) => (
            <Skeleton key={`Graph loader bar ${idx + 1}`} className="bg-custom-marker" />
         ))}
      </div>
   );
}
