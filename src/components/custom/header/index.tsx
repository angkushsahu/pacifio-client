import { getServerSession } from "next-auth";

import authOptions from "@root/app/api/auth/authOptions";
import ShadowUponScroll from "./shadowUponScroll";
import ParentComponent from "./parentComponent";
import Logo from "../logo";

export default async function Header() {
   const session = await getServerSession(authOptions);

   return (
      <ShadowUponScroll>
         <div className="center-layout flex items-center justify-between">
            <ParentComponent token={session?.token}>
               <Logo />
            </ParentComponent>
         </div>
      </ShadowUponScroll>
   );
}
