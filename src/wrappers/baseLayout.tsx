import { Footer, Header } from "@root/components/elements";
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
