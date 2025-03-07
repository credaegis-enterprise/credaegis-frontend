import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import authenticator from "../utils/Auth/authenticator";
import { MiddlewareFactory } from "./types";

export const orgAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith("/credaegis/organization"))
    {
      const authInfo = await authenticator("organization", "CREDAEGIS_SESSION");
      console.log("AUTH INFO");
      console.log(authInfo);

      if(authInfo && !authInfo.isAuthenticated){
        console.log("Redirecting to login page");
        return NextResponse.redirect(new URL("/login", request.url));
      }

      if (authInfo && authInfo.isAuthenticated && authInfo.role === "ADMIN") {
          return NextResponse.next();
      }
      else
      {
        console.log("User not authenticated");
        return  NextResponse.redirect(new URL("/unauthorized", request.url));
      }
     
    }

    return next(request, _next);
  };
};
