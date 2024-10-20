"use client";

import { Input } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";
import { Spinner, user } from "@nextui-org/react";
import { useState } from "react";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React from "react";
import MyModal from "@/components/modals/mymodal";
import { Tab, Tabs } from "@nextui-org/react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import emailValidator from "@/utils/Validators/emailValidator";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<string>("user");
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  //login functions for both admin and user
  const handleLogin = async () => {
    setIsLoading(true);
    setIsEmailInvalid(false);

    let response;
    if (!emailValidator(email)) {
      setIsEmailInvalid(true);
      toast.error("please enter a valid email");
      setIsLoading(false);
      return;
    }

    try {
      if (selected === "organization") {
        response = await myInstance.post("/organization/auth/login", {
          organizationEmail: email,
          organizationPassword: password,
        });
      } else {
        response = await myInstance.post("/member/auth/login", {
          memberEmail: email,
          memberPassword: password,
        });
      }

      if (response.data.twoFa) setIsOpen(true);
      else {
        localStorage.setItem("currentPath","dashboard");
        toast.success(response.data.message);
        const role = response.data.loginInfo.role;
        if(role === "admin"|| role ==="clusterAdmin")
        router.push(`/credaegis/${response.data.loginInfo.accountType}/dashboard`);
        else
        router.push(`/credaegis/${response.data.loginInfo.accountType}/certificates`);
      }

      setIsLoading(false);
    } catch (error: any) {

      setIsLoading(false);
    }
  };

  const handleTwoFa = async () => {
    setIsLoading(true);
    let response;
    try {
      if (selected === "organization") {
        response = await myInstance.post("/organization/auth/login/twofa", {
          organizationEmail: email,
          organizationEnteredPassword: password,
          otp: otp,
        });
      } else{
      response = await myInstance.post("/auth/login/twofa", {
        memberEmail: email,
        memberEnteredPassword: password,
        otp: otp,
      });
    }

      toast.success(response.data.message);
      localStorage.setItem("currentPath","dashboard");
      setIsLoading(false);
      setIsOpen(false);

      const role = response.data.loginInfo.role;
      if(role === "admin"|| role ==="clusterAdmin")
      router.push(`/credaegis/${response.data.loginInfo.accountType}/dashboard`);
      else
      router.push(`/credaegis/${response.data.loginInfo.accountType}/certificates`);
      
    } catch (error: any) {
      if (error.response?.status === 429) setIsOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <MyModal
        size="md"
        isOpen={isOpen}
        backdrop="blur"
        onClose={() => {
          setIsOpen(false);
        }}
        onOpen={() => {
          setIsOpen(true);
        }}
        title="Two-Factor Authentication"
        content={
          <Input
            type="text"
            label="Enter OTP"
            size="sm"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
        }
        button1={
          <MyButton
            className="bg-black dark:bg-white"
            size="sm"
            spinner={<Spinner size="sm" color="default" />}
            isLoading={isLoading}
            onClick={() => {
              handleTwoFa();
            }}
          >
    
            <span className="dark:text-black text-white text-md font-medium">
              Submit
            </span>
          </MyButton>
        }
        button2={undefined}
      />
      <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
        <div className="flex justify-end">
          <Tabs
            aria-label="options"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as string)}
          >
            <Tab key="member" title="member" />
            <Tab key="organization" title="organization" />
          </Tabs>
        </div>
        <Input
          type="email"
          label="Email"
          isInvalid={isEmailInvalid}
          errorMessage="Please enter a valid email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
            
              {isVisible ? (
                <IoMdEye className="text-2xl text-default-400 pointer-events-none " />
              ) : (
                <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          description="This information won't be shared with anyone else"
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
        <div className="flex justify-end">
          <div className="flex text-sm items-center dark:hover:text-green-400 hover:text-blue-600  transition-colors duration-300 cursor-pointer">
            Forgot password?
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
