import ShadowUponScroll from "./shadowUponScroll";
import NavAndSearch from "./navAndSearch";
import NavLinks from "./navLinks";
import Logo from "../logo";

export default function Header() {
   return (
      <ShadowUponScroll>
         <div className="center-layout flex items-center justify-between">
            <NavAndSearch />
            <Logo />
            <NavLinks />
         </div>
      </ShadowUponScroll>
   );
}
