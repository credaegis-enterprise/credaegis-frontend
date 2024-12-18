"use server";

import {myInstanceNEXT} from "../Axios/axios";
import getCookies from "../cookies/getCookies";


const authenticator = async(accountType:string,cookieName:string)=>{

    console.log("Authenticator Invoked");
    const cookie = getCookies(cookieName);
    try
    {
        const response = await myInstanceNEXT.get(`${accountType}/auth/session-check`,{
            headers:{
                cookie:`${cookieName}=${cookie}`
            }
        });
        

        return {
            isAuthenticated:response.data.success,
            accountType:response.data.responseData.accountType,
            role:response.data.responseData.role,
        }
    }
    catch(e)
    {
        return {
            isAuthenticated:false,
            accountType:"",
            role:""
        }
    }
}

export default authenticator;