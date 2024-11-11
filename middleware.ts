import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
import { getSession } from "next-auth/react";
export { default } from "next-auth/middleware"



export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NAUTH_SECRET});
    const session = await getSession();

    console.log("Session:", session);
    console.log("Token:", token);
    console.log("Requested URL:", req.nextUrl.pathname);
    if (token && req.nextUrl.pathname === '/auth/login') {
        return NextResponse.redirect(new URL('/settings/profile', req.url));
      }
    return NextResponse.next();
}

export const config = { matcher: ["/auth/login"] }

