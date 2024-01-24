import CredentialsProvider, { type CredentialInput } from "next-auth/providers/credentials";
import type { AuthOptions, Awaitable, User } from "next-auth";

import type { UserType } from "@root/validations";
import type { UserSession } from "@root/types";
import { loginUrl } from "@root/constants";

const authOptions: AuthOptions = {
   pages: {
      signIn: loginUrl,
   },
   session: {
      strategy: "jwt",
      maxAge: Number(process.env.COOKIE_AGE),
   },
   secret: process.env.NEXTAUTH_SECRET,
   debug: process.env.NODE_ENV === "development",
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {} as Record<string, CredentialInput>,
         async authorize(credentials) {
            if (!credentials) throw new Error("Invalid credentials");
            const { name, email, createdAt, id, role, token } = credentials as UserType & { token: string };
            const user = { name, email, createdAt, id, role };
            return { user, token } as unknown as Awaitable<User>;
         },
      }),
   ],
   callbacks: {
      jwt({ token, user, session, trigger }) {
         if (user) {
            const modifiedUser = user as unknown as UserSession;
            token = { ...token, user: modifiedUser.user, token: modifiedUser.token };
         }
         if (trigger === "update") {
            token.user = session.user as UserType;
            token.token = session.token as string;
         }
         return token;
      },
      session({ session, token }) {
         session.user = token.user;
         session.token = token.token;
         return session;
      },
   },
};

export default authOptions;
