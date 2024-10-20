import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import authenticator from "../utils/Auth/authenticator";
import { MiddlewareFactory } from "./types";
import { NextMiddleware } from "next/server";

export const memberAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (["/credaegis/member"]?.some((path) => pathname.startsWith(path))) {
      const authInfo = await authenticator();

       if (authInfo && authInfo.role === "admin") {
        console.log("Redirecting to dashboard");
        return NextResponse.redirect(
          new URL("/credaegis/organization/dashboard", request.url)
        );
    }

      if (
        !authInfo ||
        !authInfo.isAuthenticated ||
        (authInfo.role !== "clusterMember" && authInfo.role !== "clusterAdmin")
      ) {
        console.log("Redirecting to login");
        return NextResponse.redirect(new URL("/login", request.url));
      } 
       else {
        return NextResponse.next();
      }
    }

    return next(request, _next);
  };
};
