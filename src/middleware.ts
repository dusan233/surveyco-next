import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sso-callback",
    "/s/:path",
    "/survey-thanks",
    "/survey-taken",
    "/survey-closed",
  ],
  async afterAuth(auth, req, eve) {
    const isAuthenticated = auth.userId;
    const isPublicRoute = auth.isPublicRoute;
    const pathName = req.nextUrl.pathname;
    const user = auth.userId
      ? await clerkClient.users.getUser(auth.userId)
      : undefined;

    if (isAuthenticated) {
      //this could be a problem latter with more accounst linked... not sure.
      const isAccountVerified =
        user?.emailAddresses[0].verification?.status === "verified";
      console.log("authenticated", isAccountVerified, user?.firstName);
      if (!isAccountVerified && pathName !== "/email-verification") {
        const emailVerificationPage = new URL(
          "/email-verification",
          req.nextUrl.origin
        );
        return NextResponse.redirect(emailVerificationPage);
      }

      if (isAccountVerified) {
        if (
          pathName === "/sign-up" ||
          pathName === "/login" ||
          pathName === "/email-verification"
        ) {
          const homePage = new URL("/", req.nextUrl.origin);
          return NextResponse.redirect(homePage);
        }
      }
    }

    if (!isAuthenticated && !isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
