import axios from "axios";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";




const myInstance = axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true,
    });

   
        

export default myInstance;