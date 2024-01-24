"use client";

// import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import Image from "next/image";

import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@root/components/ui";
import { cn } from "@root/lib";

export interface ProductCarouselProps {
   images: Array<{ publicUrl: string; secureUrl: string }>;
   title: string;
}

export default function ProductCarousel({ images, title }: ProductCarouselProps) {
   const [api, setApi] = useState<CarouselApi | null>(null);
   const [current, setCurrent] = useState(0);
   const [_, setCount] = useState(0);

   useEffect(
      function () {
         if (!api) return;

         setCount(api.scrollSnapList().length);
         setCurrent(api.selectedScrollSnap() + 1);

         api.on("select", function () {
            setCurrent(api.selectedScrollSnap() + 1);
         });
      },
      [api]
   );

   return (
      <Carousel setApi={setApi} className="sticky top-28">
         {/* <Carousel plugins={[Autoplay({ duration: 3000 })]} setApi={setApi}> */}
         <CarouselContent>
            {images.map((image, idx) => {
               const imageInfo = `${title}-image-carousel-${idx + 1}`;
               return (
                  <CarouselItem key={imageInfo} className="flex items-center justify-center bg-custom">
                     <Image
                        src={
                           "https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-keyboard_jpsbah.png"
                        }
                        alt={imageInfo}
                        loading="lazy"
                        placeholder="empty"
                        width="500"
                        height="300"
                     />
                  </CarouselItem>
               );
            })}
         </CarouselContent>
         <CarouselPrevious className="top-auto left-auto bottom-0 right-4 rounded-none bg-custom-marker hover:bg-custom-light w-10 h-10" />
         <CarouselNext className="top-auto left-auto bottom-12 right-4 rounded-none bg-custom-marker hover:bg-custom-light w-10 h-10" />
         <div className="absolute z-10 bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-x-5">
            {Array.from({ length: images.length }).map((_, idx) => (
               <span
                  key={`carousel-${idx + 1}`}
                  className={cn(
                     "w-2 h-2 rounded-full border-2 border-custom-foreground cursor-pointer",
                     current === idx + 1 ? "bg-custom-foreground" : ""
                  )}
               ></span>
            ))}
         </div>
      </Carousel>
   );
}
