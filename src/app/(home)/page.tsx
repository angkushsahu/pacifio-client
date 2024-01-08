"use client";

import HeroCarousel from "./heroCarousel";
import Experiences from "./experiences";
import Categories from "./categories";
import TopRated from "./topRated";
import { useGetUser } from "@root/hooks";
import { useSession } from "next-auth/react";

export default function Home() {
   const { data: session } = useSession();
   const { data } = useGetUser({ enabled: !!session, token: session?.token as string });
   console.log(data);

   return (
      <main>
         <div>
            <HeroCarousel />
            <Experiences />
            <TopRated />
            <Categories />
         </div>
      </main>
   );
}
