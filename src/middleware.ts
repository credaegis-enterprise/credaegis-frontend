import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authenticator from './utils/Auth/authenticator'

 

export async function middleware (request: NextRequest) {
     
    console.log("middleware Invoked");
    const isAuthenticated = await authenticator();
    console.log(isAuthenticated);
    if(!isAuthenticated)
        return NextResponse.redirect(new URL('/login', request.url));
    else
        return NextResponse.next();

    // return NextResponse.next();

        
}

export const config = {

    matcher: ["/credaegis/organization/:path*"],

}
