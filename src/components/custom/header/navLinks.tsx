import Link from "next/link";

import { authenticatedItems, unAuthenticatedLinks } from "./linkArrays";
import { shoppingBagUrl } from "@root/constants/routes";
import { Button } from "@root/components/ui";

export default function NavLinks() {
   const shoppingBagItems = 10;
   const isAuth = !false;

   const navItems = isAuth ? authenticatedItems : unAuthenticatedLinks;

   return (
      <nav className="hidden md:flex items-center gap-x-8">
         {navItems.map((navItem) => {
            const isShoppingBagLink = navItem.link === shoppingBagUrl;
            return (
               <Link key={navItem.title} href={navItem.link} title={`Go to your ${navItem.title.toLowerCase()}`}>
                  <Button
                     variant="outline"
                     size="icon"
                     className="rounded-full relative border-none bg-custom hover:bg-custom-hover"
                  >
                     <navItem.Icon className="w-6 h-6" />
                     {isShoppingBagLink && shoppingBagItems > 0 ? (
                        <div className="bg-neutral-300 font-bold p-1 text-xs rounded-full border-2 border-white absolute w-7 h-7 flex items-center justify-center -top-3 -right-3">
                           10
                        </div>
                     ) : null}
                  </Button>
               </Link>
            );
         })}
      </nav>
   );
}
