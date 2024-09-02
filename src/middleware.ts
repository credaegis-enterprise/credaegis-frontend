import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authenticator from './utils/Auth/authenticator'

 

export async function middleware (request: NextRequest) {
     
    // const isAuthenticated = await authenticator();
    // console.log("is true?",isAuthenticated);
    // if(!isAuthenticated)
    //     return NextResponse.redirect(new URL('/login', request.url));
    // else
    //     return NextResponse.next();

    return NextResponse.next();

        
}

export const config = {

    matcher: ["/credaegis/organization/:path*"],

}
