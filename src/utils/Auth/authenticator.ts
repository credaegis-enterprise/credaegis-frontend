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
        

        return {
            isAuthenticated:response.data.success,
            role:response.data.role
        }
    }
    catch(e)
    {
        return false
    }
}

export default authenticator;