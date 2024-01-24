import HeroCarousel from "./heroCarousel";
import Experiences from "./experiences";
import Categories from "./categories";
import TopRated from "./topRated";

export default function Home() {
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
