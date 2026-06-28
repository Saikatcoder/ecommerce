import { getToken } from "next-auth/jwt";
import {
  MiddlewareConfig,
  NextRequest,
  NextResponse
} from "next/server";

export const middleware = async (
  req: NextRequest
) => {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  const { pathname } = req.nextUrl;

  const adminPanel =
    pathname.startsWith("/admin");

  const userPanel =
    pathname.startsWith("/user");

  // no login
  if (!session && (adminPanel || userPanel)) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  if (session) {
    const role = session.role;

    // admin routes
    if (
      adminPanel &&
      role !== "admin" &&
      role !== "superadmin"
    ) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    // user routes
    if (
      userPanel &&
      role !== "user"
    ) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    // login/signup redirect user
    if (
      (pathname === "/login" ||
        pathname === "/signup") &&
      role === "user"
    ) {
      return NextResponse.redirect(
        new URL("/user/orders", req.url)
      );
    }

    // login/signup redirect admin + superadmin
    if (
      (pathname === "/login" ||
        pathname === "/signup") &&
      (role === "admin" ||
        role === "superadmin")
    ) {
      return NextResponse.redirect(
        new URL("/admin/orders", req.url)
      );
    }
  }

  return NextResponse.next();
};

export const config: MiddlewareConfig = {
  matcher: [
    "/login",
    "/signup",
    "/user/:path*",
    "/admin/:path*"
  ]
};