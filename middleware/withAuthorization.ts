import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { useRouter } from 'next/router';

export default function withAuthorization(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (request: NextRequest, next: NextFetchEvent) => {
    const router = useRouter();
    const pathname = router.asPath;
    if (requireAuth.some((path) => pathname.startsWith(path)) && !pathname.startsWith('/admin')) {
      const token = await getToken({
        req: request,
        // secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        const url = new URL(`/auth/login`, request.url);
        url.searchParams.set("callbackUrl ", encodeURI(request.url));
        return NextResponse.redirect(url);
      }
    //   if (token.role !== "admin") {
    //     const url = new URL(`/403`, request.url);
    //     return NextResponse.rewrite(url);
    //   }
    }
    return middleware(request, next);
  };
}
