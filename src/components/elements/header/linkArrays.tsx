import { Home, Info, LogIn, Mail, ShieldCheck, ShoppingBag, UserPlus, UserRound } from "lucide-react";
import {
   aboutUrl,
   adminStatsUrl,
   contactUrl,
   homeUrl,
   loginUrl,
   registerUrl,
   shoppingBagUrl,
   userAccountUrl,
} from "@root/constants/routes";

export const commonNavItems = [
   { Icon: Home, title: "HOME", link: homeUrl },
   { Icon: Info, title: "ABOUT", link: aboutUrl },
   { Icon: Mail, title: "CONTACT", link: contactUrl },
];

export const authenticatedItems = [
   { Icon: UserRound, title: "ACCOUNT", link: userAccountUrl },
   { Icon: ShoppingBag, title: "SHOPPING BAG", link: shoppingBagUrl },
   { Icon: ShieldCheck, title: "ADMIN DASHBOARD", link: adminStatsUrl },
];

export const unAuthenticatedLinks = [
   { Icon: LogIn, title: "LOGIN", link: loginUrl },
   { Icon: UserPlus, title: "SIGNUP", link: registerUrl },
];
