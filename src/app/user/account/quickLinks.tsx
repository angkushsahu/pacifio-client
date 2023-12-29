import { BookUser, MessageSquareText, Package, ShieldAlert, ShoppingCart, SquareUser } from "lucide-react";
import Link from "next/link";

import {
   allAddressUrl,
   allOrdersUrl,
   contactUrl,
   homeUrl,
   userAccountUpdateUrl,
   userPasswordUpdateUrl,
} from "@root/constants/routes";

const quickLinks = [
   {
      Icon: Package,
      title: "Your Orders",
      description: "Track your order history here",
      path: allOrdersUrl,
   },
   {
      Icon: BookUser,
      title: "Saved Address",
      description: "Track and edit all your saved address here",
      path: allAddressUrl,
   },
   {
      Icon: SquareUser,
      title: "Update Profile",
      description: "Update your name and e-mail address here",
      path: userAccountUpdateUrl,
   },
   {
      Icon: ShieldAlert,
      title: "Change Password",
      description: "Update your password if necessary here",
      path: userPasswordUpdateUrl,
   },
   {
      Icon: MessageSquareText,
      title: "Contact Us",
      description: "Feel free to share your feedback or register any complaint",
      path: contactUrl,
   },
   {
      Icon: ShoppingCart,
      title: "Continue Shopping",
      description: "Resume your shopping journey",
      path: homeUrl,
   },
];

export default function QuickLinks() {
   return (
      <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-5">
         {quickLinks.map((quickLink) => (
            <Link
               href={quickLink.path}
               key={quickLink.title}
               className="bg-custom hover:bg-custom-hover p-5 rounded-md shadow-md"
            >
               <article>
                  <div className="p-3 rounded-md bg-custom-marker inline-block">
                     <quickLink.Icon className="text-custom-foreground w-7 h-7" />
                  </div>
                  <p className="font-semibold text-lg mt-3 mb-1">{quickLink.title}</p>
                  <p>{quickLink.description}</p>
               </article>
            </Link>
         ))}
      </div>
   );
}
