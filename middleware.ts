import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/"];
  const isPathProtected = protectedPaths?.some((path) => pathname.startsWith(path));
  const res = NextResponse.next();
  
  console.log("getToken:", getToken({ req }))
  if (pathname !== "/auth/login/" && !pathname.startsWith("/api/") && !pathname.startsWith("/_next/") && !pathname.startsWith("/static/") && isPathProtected) {
    const token = getToken({ req });
    if (!token) {
      const url = new URL(`/auth/login/`, req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }
  
  return res;
}

export const config = {
  matcher: [
    /*
      * api (API 라우트)
      * _next/static (정적 파일)
      * _next/image (이미지 최적화 파일)
      * favicon.ico (파비콘 파일)
      * 로 시작하지 않는 모든 요청 경로와 일치합니다.
      */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
