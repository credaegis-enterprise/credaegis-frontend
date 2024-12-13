'use server';
import { cookies } from "next/headers";


const getCookies = () => {
    const mycookies = cookies();
    const cookie = mycookies.get("SESSION")?.value || "";
    return cookie;
   
}

export default getCookies;