import NextAuth, { type User, type DefaultSession } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

import type { UserType } from "@root/validations";

declare module "next-auth" {
   interface Session {
      user: UserType & DefaultSession["user"];
      token: string;
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      user: UserType;
      token: string;
   }
}
