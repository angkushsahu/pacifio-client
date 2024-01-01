import { Footer, Header } from "@root/components/custom";
import type { PropsWithChildren } from "react";

export default function BaseLayout({ children }: PropsWithChildren) {
   return (
      <>
         <Header />
         {children}
         <Footer />
      </>
   );
}
