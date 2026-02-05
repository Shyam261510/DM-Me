import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/"];

// check exact frontend public paths
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname);
}

function getSessionToken(req: NextRequest): string | undefined {
  return (
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value
  );
}

export async function proxy(req: NextRequest) {
  const session = getSessionToken(req);
  if (!session && !isPublicRoute(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (session && isPublicRoute(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/Home", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
