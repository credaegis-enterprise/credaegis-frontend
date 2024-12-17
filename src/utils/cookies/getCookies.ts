'use server';
import { cookies } from "next/headers";


const getCookies = (name:string) => {
    const mycookies = cookies();
    const cookie = mycookies.get(name)?.value || "";
    return cookie;
   
}

export default getCookies;