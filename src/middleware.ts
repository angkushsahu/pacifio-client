import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

import type { GetUserType } from "./validations";
import { signupUrl } from "./constants/routes";

export default withAuth(
   async function middleware(request: NextRequestWithAuth) {
      const token = request.nextauth.token?.token;
      if (!token) return NextResponse.rewrite(new URL(signupUrl, request.url));

      const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user`, {
         headers: { Authorization: `Bearer ${token}` },
      });
      const responseJson: GetUserType = await apiResponse.json();

      if (!responseJson?.data?.user) return NextResponse.rewrite(new URL(signupUrl, request.url));
      const { user } = responseJson.data;

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
