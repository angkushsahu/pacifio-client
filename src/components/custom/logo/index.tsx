import Image from "next/image";
import Link from "next/link";

import { homeUrl } from "@root/constants/routes";
import logo from "@root/assets/logo.png";

export default function Logo() {
   return (
      <Link href={homeUrl}>
         <div className="flex items-center gap-[0.4ch] tracking-[0.25ch]">
            <Image src={logo} alt="Logo" className="w-6 h-6" />
            <span className="text-xl font-semibold">ACIFIO</span>
         </div>
      </Link>
   );
}
