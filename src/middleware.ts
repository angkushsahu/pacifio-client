import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

import { signupUrl } from "./constants/routes";

export default withAuth(
   function middleware(request: NextRequestWithAuth) {
      const user = request.nextauth.token?.user;
      if (!user) return NextResponse.rewrite(new URL(signupUrl, request.url));

      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/admin") && user.role !== "admin" && user.role !== "super-admin")
         return NextResponse.rewrite(new URL(signupUrl, request.url));
   },
   {
      callbacks: {
         authorized: (params: any) => params && params.token && params.token.user,
      },
   }
);

export const config = { matcher: ["/user/:path*", "/address/:path*", "/admin/:path*", "/order/:path*", "/shipping/:path*"] };
