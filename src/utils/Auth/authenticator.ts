"use server";

import {myInstanceNEXT} from "../Axios/axios";
import getCookies from "../cookies/getCookies";


const authenticator = async()=>{

    console.log("Authenticator Invoked");
    const cookie = getCookies();
    console.log(cookie);
    try
    {
        const response = await myInstanceNEXT.get("/session/check-session",{
            headers:{
                cookie:`test=${cookie}`
            }
        });
        console.log(response.data);
        return true
    }
    catch(e)
    {
        console.log(e);
        return false
    }
}

export default authenticator;