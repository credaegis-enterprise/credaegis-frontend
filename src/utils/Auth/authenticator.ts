"use server";

import {myInstanceNEXT} from "../Axios/axios";
import getCookies from "../cookies/getCookies";


const authenticator = async()=>{

    console.log("Authenticator Invoked");
    const cookie = getCookies();
    try
    {
        const response = await myInstanceNEXT.get("/api/auth/checker",{
            headers:{
                cookie:`test=${cookie}`
            }
        });
        return true
    }
    catch(e)
    {
        return false
    }
}

export default authenticator;