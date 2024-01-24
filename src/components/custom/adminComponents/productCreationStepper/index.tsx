"use client";

import { CheckCircle2, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { adminCreateProductUrl, baseAdminSelectDefaultProductImageUrl, baseAdminUploadProductImageUrl } from "@root/constants";
import { Button } from "@root/components/ui";
import { cn } from "@root/lib";

export default function ProductCreationStepper() {
   const [toggleSteps, setToggleSteps] = useState(true);
   const [currentStep, setCurrentStep] = useState(0);
   const pathname = usePathname();

   useEffect(
      function () {
         if (pathname.includes(adminCreateProductUrl)) setCurrentStep(1);
         if (pathname.includes(baseAdminUploadProductImageUrl)) setCurrentStep(2);
         if (pathname.includes(baseAdminSelectDefaultProductImageUrl)) setCurrentStep(3);
      },
      [pathname]
   );

   return (
      <section className="mt-2 mb-4">
         <Button variant="secondary" className={cn({ "mb-3": toggleSteps })} onClick={() => setToggleSteps((prev) => !prev)}>
            Product Creation Steps
            <ChevronDown className={cn("ml-2 w-5 h-5 transition-transform", { "-rotate-90": !toggleSteps })} />
         </Button>
         {toggleSteps ? (
            <div className="text-custom-foreground flex flex-col sm:flex-row items-start sm:items-center gap-x-6 gap-y-2">
               <div className="flex items-center gap-x-2">
                  {currentStep > 1 ? (
                     <CheckCircle2 className="bg-black rounded-full text-white w-8 h-8" />
                  ) : (
                     <p className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-custom-foreground">1</p>
                  )}
                  <p className={cn({ "text-black font-medium": currentStep > 1 })}>Product Info</p>
               </div>
               <div className="flex-1 h-0.5 bg-custom-marker"></div>
               <div className="flex items-center gap-x-2">
                  {currentStep > 2 ? (
                     <CheckCircle2 className="bg-black rounded-full text-white w-8 h-8" />
                  ) : (
                     <p className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-custom-foreground">2</p>
                  )}
                  <p className={cn({ "text-black font-medium": currentStep > 2 })}>Upload Images</p>
               </div>
               <div className="flex-1 h-0.5 bg-custom-marker"></div>
               <div className="flex items-center gap-x-2">
                  {currentStep > 3 ? (
                     <CheckCircle2 className="bg-black rounded-full text-white w-8 h-8" />
                  ) : (
                     <p className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-custom-foreground">3</p>
                  )}
                  <p className={cn({ "text-black font-medium": currentStep > 3 })}>Select Default Image</p>
               </div>
            </div>
         ) : null}
      </section>
   );
}
