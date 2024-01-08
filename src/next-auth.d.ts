import NextAuth, { type User, type DefaultSession } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

import type { IUser } from "@root/types";

declare module "next-auth" {
   interface Session {
      user: IUser & DefaultSession["user"];
      token: string;
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      user: IUser;
      token: string;
   }
}
