"use client";

// import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
   type CarouselApi,
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
   Button,
} from "@root/components/ui";
import { productsUrl } from "@root/constants/routes";
import { cn } from "@root/lib";

const carouselItems = [
   {
      title: "New Gen Keyboards",
      subTitle: "Upgrade your gaming setup with a keyboard that's as fierce as you are",
      linkToCategory: `${productsUrl}?category=keyboard`,
      image: "https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-keyboard_jpsbah.png",
      descriptionSection: {
         title: "Shop Keyboards",
         description:
            "at your budget. With cutting-edge technology and a design built for performance, a gaming keyboard is the ultimate weapon in the fight for glory.",
      },
   },
   {
      title: "Cutting Edge Mouse",
      subTitle: "Step up your game with a mouse designed to give you the edge you need to win",
      linkToCategory: `${productsUrl}?category=mouse`,
      image: "https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-mouse_erdtbo.png",
      descriptionSection: {
         title: "Shop Mouse",
         description: "with programmable buttons and customizable lighting, a gaming mouse is the perfect weapon for any battle.",
      },
   },
   {
      title: "Textured Mouse Pads",
      subTitle: "Unlock new levels of control and accuracy with a mouse pad that's built for gamers",
      linkToCategory: `${productsUrl}?category=mouse-pad`,
      image: "https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-mouse-pad_yaiwx7.png",
      descriptionSection: {
         title: "Shop Mouse Pad",
         description: "with a textured surface and optimized tracking, you'll have the edge you need to claim victory.",
      },
   },
   {
      title: "Performance Cooling Pads",
      subTitle: "Unlock new levels of power and stability with a cooling pad that's built for gamers",
      linkToCategory: `${productsUrl}?category=cooling-pad`,
      image: "https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-cooling-pad_dtcpf3.png",
      descriptionSection: {
         title: "Shop Cooling Pad",
         description: "with high-performance fans and a durable design, you'll have the edge you need to claim victory.",
      },
   },
   {
      title: "Noise Cancelling Headsets",
      subTitle: "Step up your gaming experience with a headset that's built for performance",
      linkToCategory: `${productsUrl}?category=headset`,
      image: "https://res.cloudinary.com/dvhucdquc/image/upload/v1703745178/pacifio/miscellaneous/aazsk4web7bidjnhl4hz.png",
      descriptionSection: {
         title: "Shop Headsets",
         description:
            "with advanced audio technology and a comfortable design, a gaming headset is the perfect accessory for any serious gamer.",
      },
   },
];

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
         <Carousel setApi={setApi}>
            {/* <Carousel plugins={[Autoplay({ duration: 3000 })]} setApi={setApi}> */}
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
