import axios from "axios";




export const myInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,
    });

   
export const myInstanceNEXT = axios.create({
    baseURL: process.env.NEXT_PUBLIC_devbackendurl,
    withCredentials: true,
    });


