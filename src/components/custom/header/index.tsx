import { getServerSession } from "next-auth";

import authOptions from "@root/app/api/auth/authOptions";
import ShadowUponScroll from "./shadowUponScroll";
import NavAndSearch from "./navAndSearch";
import NavLinks from "./navLinks";
import Logo from "../logo";

export default async function Header() {
   const session = await getServerSession(authOptions);

   return (
      <ShadowUponScroll>
         <div className="center-layout flex items-center justify-between">
            <NavAndSearch isAuth={session?.token && session?.user ? true : false} />
            <Logo />
            <NavLinks token={session?.token} user={session?.user} />
         </div>
      </ShadowUponScroll>
   );
}
