import { NextRequest, NextResponse } from "next/server";
import { is } from "zod/v4/locales";

const PUBLIC_ROUTES = ["/", "/login"];
const SPEICAL_ROUTES = ["/privacy-policy", "/terms-and-conditions"];
const PUBLIC_PREFIX = ["/invite"];
// check exact frontend public paths
function isPublicRoute(pathname: string): boolean {
  return (
    PUBLIC_ROUTES.includes(pathname) ||
    PUBLIC_PREFIX.some((prefix) => pathname.startsWith(prefix))
  );
}

function isSpecialRoute(pathname: string): boolean {
  return SPEICAL_ROUTES.includes(pathname);
}

function getSessionToken(req: NextRequest): string | undefined {
  return (
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value
  );
}

export async function proxy(req: NextRequest) {
  const session = getSessionToken(req);

  if (isSpecialRoute(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  if (!session && !isPublicRoute(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if the user authanicated and user want to go to inivite then user can do that else navigate the user to home page
  if (session && req.nextUrl.pathname.startsWith("/invite")) {
    return NextResponse.next();
  }
  if (session && isPublicRoute(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/Home", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
