"use client";

import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@root/components/ui";
import { Button, type CarouselApi } from "@root/components/ui";
import { carouselItems } from "./carouselItems";
import { cn } from "@root/lib";

export default function HeroCarousel() {
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
      <section className="bg-custom pb-2">
         <Carousel plugins={[Autoplay({ delay: 3000 })]} setApi={setApi}>
            <CarouselContent>
               {carouselItems.map((item, idx) => (
                  <CarouselItem key={`carousel-${idx + 1}`}>
                     <article className="min-h-carousel flex flex-col items-center justify-center gap-y-8 lg:gap-y-16 pt-8 lg:pt-0 pb-10 px-5">
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-x-24">
                           <div>
                              <Image
                                 src={item.image}
                                 alt={item.title}
                                 loading="lazy"
                                 placeholder="empty"
                                 width="500"
                                 height="300"
                              />
                           </div>
                           <div className="max-w-96 w-full">
                              <p className="font-bold tracking-widest text-5xl text-custom-light">{idx + 1}.0</p>
                              <p className="font-semibold text-xl mt-2 mb-3">{item.title}</p>
                              <p className="text-muted-foreground mb-4">{item.subTitle}</p>
                              <Link href={item.linkToCategory}>
                                 <Button>Shop Now</Button>
                              </Link>
                           </div>
                        </div>
                        <div className="max-w-md w-full shadow-md pb-5 rotate-180">
                           <div className="shadow-lg pb-5 px-5 rotate-180">
                              <p className="mb-2 font-semibold text-lg">{item.descriptionSection.title}</p>
                              <p className="text-muted-foreground">{item.descriptionSection.description}</p>
                           </div>
                        </div>
                     </article>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious className="top-auto left-auto bottom-0 right-4 rounded-none bg-custom-marker hover:bg-custom-light w-10 h-10" />
            <CarouselNext className="top-auto left-auto bottom-12 right-4 rounded-none bg-custom-marker hover:bg-custom-light w-10 h-10" />
            <div className="absolute z-10 bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-x-5">
               {Array.from({ length: carouselItems.length }).map((_, idx) => (
                  <span
                     key={`carousel-link-${idx + 1}`}
                     className={cn(
                        "w-2 h-2 rounded-full border-2 border-custom-foreground cursor-pointer",
                        current === idx + 1 ? "bg-custom-foreground" : ""
                     )}
                  ></span>
               ))}
            </div>
         </Carousel>
      </section>
   );
}
