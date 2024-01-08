import CredentialsProvider, { type CredentialInput } from "next-auth/providers/credentials";
import type { AuthOptions, Awaitable, User } from "next-auth";

import type { IUser, UserSession } from "@root/types";
import { loginUrl } from "@root/constants/routes";
import env from "@root/config/server.mjs";

const authOptions: AuthOptions = {
   pages: {
      signIn: loginUrl,
   },
   session: {
      strategy: "jwt",
      maxAge: env.COOKIE_AGE,
   },
   secret: env.NEXTAUTH_SECRET,
   debug: env.NODE_ENV === "development",
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {} as Record<string, CredentialInput>,
         async authorize(credentials) {
            if (!credentials) throw new Error("Invalid credentials");
            const { name, email, createdAt, id, role, token } = credentials as IUser & { token: string };
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
            token.user = session.user as IUser;
            token.token = session.token as string;
            console.log(token);
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
