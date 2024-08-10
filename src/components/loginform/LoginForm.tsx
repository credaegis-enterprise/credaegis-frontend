'use client'


import { Input } from "@nextui-org/input";
import { MyButton } from "../buttons/mybutton";
import { Spinner } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async () => {

    setIsLoading(true);
    

    // try {
    //   const response = await axios.post("http://localhost:3001/api/auth/organization/login", {
    //     organization_email:email,
    //     organization_password:password
    //   },{withCredentials:true}

    // );

    //   console.log(response.data.message);
    //   setIsLoading(false);
    // } catch (error: any) {
    //   console.error(error);
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" label="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <MyButton  className="bg-black dark:bg-white" size="md" spinner={<Spinner size="sm" color="default"/>} isLoading={isLoading}   onClick={()=>{handleLogin()}}>
               <span className="dark:text-black text-white text-md font-medium">login to your account</span>
      </MyButton>
    </div>
  );
};

export default LoginForm;
