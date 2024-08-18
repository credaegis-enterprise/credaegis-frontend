"use client";

import { Input } from "@nextui-org/input";
import { MyButton } from "@/components/buttons/mybutton";
import { Spinner } from "@nextui-org/react";
import { useState } from "react";
import {myInstance} from "@/utils/Axios/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React from "react";
import MyModal from "@/components/modals/mymodal";
import { Tab, Tabs } from "@nextui-org/react";
import { error } from "console";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<string>("user");
  const [otp,setOtp] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  console.log(selected);

  //login functions for both admin and user
  const handleLogin = async () => {
    setIsLoading(true);
    let response;
    try {
      if (selected === "admin") {
        response = await myInstance.post("/auth/organization/login", {
          organization_email: email,
          organization_password: password,
        });

        router.push("/credaegis/organization/dashboard");
      } else {
        response = await myInstance.post("/auth/login", {
          member_email: email,
          member_password: password,
        });
      }

      if (response.data.twoFa) setIsOpen(true);
      else toast.success(response.data.message);

      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data.message || "An error occurred");
      setIsLoading(false);
    }
  };


  const handleTwoFa = async () => {
      setIsLoading(true);
      let response;
      try
      {
        response = await myInstance.post("/auth/login/twofa",{
          user_email:email,
          otp:otp
        });

        toast.success(response.data.message);
        setIsLoading(false);
        setIsOpen(false);
        router.push("/dashboard");
      }
      catch(error:any)
      {
        toast.error(error.response?.data.message || "An error occurred");
        console.log(error);
        if(error.response?.status===429) setIsOpen(false);
        setIsLoading(false);

      }
  }

  return (
    <div>
      <MyModal
        size="md"
        isOpen={isOpen}
        backdrop="blur"
        onClose={() => {
          setIsOpen(false);
        } }
        onOpen={() => {
          setIsOpen(true);
        } }
        title="Two-Factor Authentication"
        content={<Input type="text" label="Enter OTP" size="sm" value={otp} onChange={(e) => { setOtp(e.target.value); } } />}
        button1={<MyButton
          className="bg-black dark:bg-white"
          size="sm"
          spinner={<Spinner size="sm" color="default" />}
          isLoading={isLoading}
          onClick={() => {
            handleTwoFa();
          } }
        >
          <span className="dark:text-black text-white text-md font-medium">
            Submit
          </span>
        </MyButton>} button2={undefined}      />
      <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
        <div className="flex justify-end">
          <Tabs
            aria-label="options"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as string)} 
          >
            <Tab key="user" title="user" />
            <Tab key="admin" title="admin" />
          </Tabs>
        </div>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <MyButton
          className="bg-black dark:bg-white"
          size="md"
          spinner={<Spinner size="sm" color="default" />}
          isLoading={isLoading}
          onClick={() => {
            handleLogin();
          }}
        >
          <span className="dark:text-black text-white text-md font-medium">
            login to your account
          </span>
        </MyButton>
      </div>
    </div>
  );
};

export default LoginForm;
