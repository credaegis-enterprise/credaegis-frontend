import axios from "axios";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";




export const myInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,
    });

   
export const myInstanceNEXT = axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true,
    });


