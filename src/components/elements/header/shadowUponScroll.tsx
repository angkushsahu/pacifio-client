"use client";

import { type PropsWithChildren, useEffect, useState } from "react";
import { cn } from "@root/lib";

export default function ShadowUponScroll({ children }: PropsWithChildren) {
   const [top, setTop] = useState(false);

   useEffect(() => {
      function scrollShadow() {
         window.scrollY > 50 ? setTop(true) : setTop(false);
      }

      window.addEventListener("scroll", scrollShadow);
      return () => document.removeEventListener("scroll", scrollShadow);
   }, [top]);

   return (
      <header className={cn("sticky z-50 top-0 px-4 py-3 md:py-5 bg-custom", top ? "shadow-lg" : "shadow-none")}>
         {children}
      </header>
   );
}
