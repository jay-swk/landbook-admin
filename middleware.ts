// import { getToken } from "next-auth/jwt";
// import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   const pathname = req.nextUrl.pathname;
//   const protectedPaths = ["/", "/admin"];
//   const isPathProtected = protectedPaths?.some((path) => pathname == path);
//   const res = NextResponse.next();
//   if (isPathProtected) {
//     const token = await getToken({ req });
//     if (!token) {
//       const url = new URL(`/auth/login`, req.url);
//       url.searchParams.set("callbackUrl", pathname);
//       return NextResponse.redirect(url);
//     }
//   }
//   return res;
// }

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/"];
  const isPathProtected = protectedPaths?.some((path) => pathname.startsWith(path));
  const res = NextResponse.next();
  
  console.log(pathname)
  if (pathname !== "/auth/login/" && !pathname.startsWith("/api/") && !pathname.startsWith("/_next/") && !pathname.startsWith("/static/") && isPathProtected) {
    const token = await getToken({ req });
    console.log(token)
    if (!token) {
      const url = new URL(`/auth/login`, req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }
  
  return res;
}
