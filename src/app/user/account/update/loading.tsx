import { Skeleton } from "@root/components/ui";

export default function UserInfoLoading() {
   return (
      <div className="space-y-5">
         {Array.from({ length: 2 }).map((_, idx) => (
            <div key={`User info loading ${idx + 1}`} className="space-y-2">
               <Skeleton className="bg-custom-marker h-5 w-24" />
               <Skeleton className="bg-custom-marker h-10 w-full" />
            </div>
         ))}
         <Skeleton className="bg-black h-10 w-full mt-5 rounded-none" />
      </div>
   );
}
