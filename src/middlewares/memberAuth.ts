import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import authenticator from "../utils/Auth/authenticator";
import { MiddlewareFactory } from "./types";

export const memberAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;


    if (pathname.startsWith("/credaegis/member")) {
      const authInfo = await authenticator();

 
      if (!authInfo || !authInfo.isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
      }


      if (authInfo.role === "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

     
      if (
        ["approvals", "dashboard"].some((segment) =>
          pathname.includes(`/credaegis/member/${segment}`)
        ) &&
        authInfo.role === "clusterMember"
      ) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      
      if (authInfo.role === "clusterAdmin") {
        return NextResponse.next();
      }


      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }


    return next(request, _next);
  };
};
