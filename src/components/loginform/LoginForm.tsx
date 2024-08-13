'use client'


import { Input } from "@nextui-org/input";
import { MyButton } from "../buttons/mybutton";
import { Spinner } from "@nextui-org/react";
import { useState } from "react";
import myInstance from "@/utils/Axios/axios";
import { toast } from "sonner";
import  {useRouter} from "next/navigation";
import React from "react";
import { Tab,Tabs } from "@nextui-org/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<string>("user");
  const router = useRouter();

  console.log(selected);


  //login functions for both admin and user
  const handleLogin = async () => {
    setIsLoading(true);
    let response;
    try {
      if(selected === "admin"){
       response = await myInstance.post("/auth/organization/login", {
        organization_email:email,
        organization_password:password
      },);
    }
    else{
       response = await myInstance.post("/auth/login", {
        member_email:email,
        member_password:password
      },);
    }
      toast.success(response.data.message);
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data.message || "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
      <div className="flex justify-end">
      <Tabs aria-label="options" selectedKey={selected} onSelectionChange={setSelected}>
        <Tab key="user" title="user" />
        <Tab key="admin" title="admin" />
      </Tabs>
      </div>
      <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" label="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <MyButton  className="bg-black dark:bg-white" size="md" spinner={<Spinner size="sm" color="default"/>} isLoading={isLoading}   onClick={()=>{handleLogin()}}>
               <span className="dark:text-black text-white text-md font-medium">login to your account</span>
      </MyButton>
    </div>
  );
};

export default LoginForm;
