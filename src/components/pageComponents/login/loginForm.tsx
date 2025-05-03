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
  const [isForgotEmailInvalid, setIsForgotEmailInvalid] = useState(false);
  const [forgotPasswordPopup, setForgotPasswordPopup] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  //login functions for both admin and user
  const handleLogin = async () => {
    setIsLoading(true);
    setIsEmailInvalid(false);
    setIsPasswordInvalid(false);

    let response;
    if (!emailValidator(email)) {
      setIsEmailInvalid(true);
      toast.error("Please enter a valid email");
      setIsLoading(false);
      return;
    }

    if(password.length===0){
      setIsPasswordInvalid(true);
      toast.error("Please enter a valid password");
      setIsLoading(false);
      return;
    }

    try {
      if (selected === "organization") {
        response = await myInstance.post("/organization/auth/login", {
          email: email,
          password: password,
        });
      } else {
        response = await myInstance.post("/member/auth/login", {
          email: email,
          password: password,
        });
      }

      console.log(response);

      if (response.data.responseData.mfaEnabled) setIsOpen(true);
      else {
        localStorage.setItem("currentPath","dashboard");
        toast.success(response.data.message);
        const role = response.data.responseData.role;
        if(role === "ADMIN"|| role ==="CLUSTER_ADMIN")
        router.push(`/credaegis/${response.data.responseData.accountType}/dashboard`);
        else
        router.push(`/credaegis/${response.data.responseData.accountType}/certificates`);
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
        response = await myInstance.post("/organization/auth/mfa/login", {
          email: email,
          password: password,
          otp: otp,
        });
      } else{
      response = await myInstance.post("/member/auth/mfa/login", {
        email: email,
        password: password,
        otp: otp,
      });
    }

      toast.success(response.data.message);
      localStorage.setItem("currentPath","dashboard");
      setIsLoading(false);
      setIsOpen(false);

      const role = response.data.responseData.role;
      if(role === "ADMIN"|| role ==="CLUSTER_ADMIN")
      router.push(`/credaegis/${response.data.responseData.accountType}/dashboard`);
      else
      router.push(`/credaegis/${response.data.responseData.accountType}/certificates`);
      
    } catch (error: any) {
      if (error.response?.status === 429) setIsOpen(false);
      setIsLoading(false);
    }
  };


  const handleForgotPassword = async () => {

    setIsLoading(true);
    setIsForgotEmailInvalid(false);

    if (!emailValidator(email)) {
      setIsForgotEmailInvalid(true);
      toast.error("Please enter a valid email");
      setIsLoading(false);
      return;
    }
    let response;
    try {
  
        response = await myInstance.post(`/organization/auth/forgot-password?email=${email}`);
      toast.success(response.data.message);
      setIsLoading(false);
      setForgotPasswordPopup(false);
    } catch (error: any) {
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
            <Tab key="member" title="Member" />
            <Tab key="organization" title="Organization" />
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
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={isPasswordInvalid}
          errorMessage="Please enter a valid password"
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
            Login
          </span>
          
        </MyButton>
        <div className="flex justify-end">
          <div 
          onClick={() => {
            setForgotPasswordPopup(true);
          }}
          className="flex text-sm items-center dark:hover:text-green-400 hover:text-blue-600  transition-colors duration-300 cursor-pointer">
            Forgot Password?
          </div>
        </div>

        {forgotPasswordPopup && (

          <MyModal
            size="md"
            isOpen={forgotPasswordPopup}
            backdrop="blur"
            onClose={() => {
              setForgotPasswordPopup(false);
            }}
            onOpen={() => {
              setForgotPasswordPopup(true);
            }}
            title="Forgot Password"
            content={
              <div>
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  isInvalid={isForgotEmailInvalid}
                  errorMessage="Please enter a valid email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            }
            button1={
              <MyButton
                className="bg-black dark:bg-white"
                size="sm"
                spinner={<Spinner size="sm" color="default" />}
                isLoading={isLoading}
                onClick={() => {
                  handleForgotPassword();
                }}
              >
                <span className="dark:text-black text-white text-md font-medium">
                  Send Reset Link
                </span>
              </MyButton>
            }
            button2={undefined}
          />
          )}
      </div>

    
    </div>
  );
};

export default LoginForm;













