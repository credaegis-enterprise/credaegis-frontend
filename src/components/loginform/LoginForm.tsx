'use client'

import { Input } from "@nextui-org/input";
import { MyButton } from "../buttons/mybutton";
import { useState } from "react";
import axios from "axios";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    console.log(email, password);

    try {
      const response = await axios.post("http://localhost:3001/api/auth/organization/login", {
        organization_email:email,
        organization_password:password
      },{withCredentials:true}

    );

      console.log(response.data.message);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" label="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <MyButton color="black" size="md" disabled={isLoading} onClick={()=>{handleLogin()}}>
        login
      </MyButton>
    </div>
  );
};

export default LoginForm;
