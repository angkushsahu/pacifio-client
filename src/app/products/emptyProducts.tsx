import { Frown } from "lucide-react";

export default function EmptyProducts() {
   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12 flex flex-col items-center justify-center gap-y-5">
         <Frown size="200" strokeWidth="1.5" className="text-custom-foreground" />
         <h1 className="text-2xl font-semibold">There are no products matching the provided filters</h1>
      </main>
   );
}
