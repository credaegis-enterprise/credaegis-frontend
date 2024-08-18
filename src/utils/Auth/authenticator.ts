"use server";

import {myInstance} from "../Axios/axios";
import getCookies from "../cookies/getCookies";


const authenticator = async()=>{

    const cookie = getCookies();
    try
    {
        const response = await myInstance.get("/auth/checker",{
            headers:{
                cookie:`test=${cookie}`
            }
        });
       
        return true
    }
    catch(e)
    {
        console.log("error");
        return false
    }
}

export default authenticator;