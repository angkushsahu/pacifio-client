import { ProductCreationStepper } from "@root/components/custom";
import type { PropsWithChildren } from "react";

export default function AdminProductLayout({ children }: PropsWithChildren) {
   return (
      <>
         <ProductCreationStepper />
         {children}
      </>
   );
}
