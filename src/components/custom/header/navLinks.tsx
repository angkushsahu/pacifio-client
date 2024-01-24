import type { DefaultSession } from "next-auth";
import Link from "next/link";

import { authenticatedItems, unAuthenticatedLinks } from "./linkArrays";
import { adminDashboardUrl, shoppingBagUrl } from "@root/constants";
import type { UserType } from "@root/validations";
import ShoppingBagPill from "./shoppingBagPill";
import { Button } from "@root/components/ui";

export interface NavLinksProps {
   token: string | null | undefined;
   user: (UserType & DefaultSession["user"]) | null | undefined;
}

export default function NavLinks({ token, user }: NavLinksProps) {
   const navItems = token && user ? authenticatedItems : unAuthenticatedLinks;

   return (
      <nav className="hidden md:flex items-center gap-x-8">
         {navItems.map((navItem) => {
            const isShoppingBagLink = navItem.link === shoppingBagUrl;
            if (navItem.link === adminDashboardUrl && user?.role === "user") return null;
            return (
               <Link key={navItem.title} href={navItem.link} title={`Go to your ${navItem.title.toLowerCase()}`}>
                  <Button
                     variant="outline"
                     size="icon"
                     className="rounded-full relative border-none bg-custom hover:bg-custom-hover"
                  >
                     <navItem.Icon className="w-6 h-6" />
                     {isShoppingBagLink && token ? <ShoppingBagPill token={token} /> : null}
                  </Button>
               </Link>
            );
         })}
      </nav>
   );
}
