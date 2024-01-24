import { Home, Info, LogIn, Mail, ShieldCheck, ShoppingBasket, UserPlus, UserRound } from "lucide-react";
import {
   aboutUrl,
   adminDashboardUrl,
   contactUrl,
   homeUrl,
   loginUrl,
   signupUrl,
   shoppingBagUrl,
   userAccountUrl,
} from "@root/constants";

export const commonNavItems = [
   { Icon: Home, title: "HOME", link: homeUrl },
   { Icon: Info, title: "ABOUT", link: aboutUrl },
   { Icon: Mail, title: "CONTACT", link: contactUrl },
];

export const authenticatedItems = [
   { Icon: UserRound, title: "ACCOUNT", link: userAccountUrl },
   { Icon: ShoppingBasket, title: "SHOPPING BAG", link: shoppingBagUrl },
   { Icon: ShieldCheck, title: "ADMIN DASHBOARD", link: adminDashboardUrl },
];

export const unAuthenticatedLinks = [
   { Icon: LogIn, title: "LOGIN", link: loginUrl },
   { Icon: UserPlus, title: "SIGNUP", link: signupUrl },
];
