import axios from "axios";




export const myInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,
    });

   
export const myInstanceNEXT = axios.create({
    baseURL: "http://allenbastian.ddns.net:3001/api",
    withCredentials: true,
    });


