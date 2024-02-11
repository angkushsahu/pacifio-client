"use client";

import Link from "next/link";

import { authenticatedItems, unAuthenticatedLinks } from "./linkArrays";
import { Avatar, AvatarFallback, Button } from "@root/components/ui";
import { adminDashboardUrl, shoppingBagUrl } from "@root/constants";
import type { UserType } from "@root/validations";
import ShoppingBagPill from "./shoppingBagPill";
import { userAvatarName } from "@root/lib";

export interface NavLinksProps {
   user: UserType | undefined;
   token: string | undefined;
   isLoading: boolean;
}

export default function NavLinks({ isLoading, token, user }: NavLinksProps) {
   const navItems = isLoading ? [] : user ? authenticatedItems : unAuthenticatedLinks;
   const userAvatar = user?.name ? userAvatarName({ userName: user.name }) : "";

   return (
      <nav className="hidden md:flex items-center gap-x-8">
         {navItems.map((navItem) => {
            const isShoppingBagLink = navItem.link === shoppingBagUrl;
            if (navItem.link === adminDashboardUrl && (!user || user.role === "user")) return null;
            return (
               <Link key={navItem.title} href={navItem.link} title={`Go to your ${navItem.title.toLowerCase()}`}>
                  <Button
                     variant="outline"
                     size="icon"
                     className="rounded-full relative border-none bg-custom hover:bg-custom-hover"
                  >
                     {navItem.title === "ACCOUNT" ? (
                        <Avatar>
                           <AvatarFallback className="bg-custom-marker hover:bg-custom-hover">{userAvatar}</AvatarFallback>
                        </Avatar>
                     ) : (
                        <navItem.Icon className="w-6 h-6" />
                     )}
                     {isShoppingBagLink && token ? <ShoppingBagPill token={token} /> : null}
                  </Button>
               </Link>
            );
         })}
      </nav>
   );
}
