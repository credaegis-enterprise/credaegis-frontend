"use client";

import { Input, Button, Card } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa";
import { myInstance } from "@/utils/Axios/axios";
import { useRouter } from "next/navigation"
import { set } from "lodash";
import { Spinner } from "@nextui-org/react";

const ResetPasswordPage = () => {
  const [resetToken, setResetToken] = useState<string | null>("");
  const router = useRouter();
  const [email, setEmail] = useState<string | null>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = useState(false);
  const [loading, setisLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    setResetToken(token);
    setEmail(email);
  }, []);

  const handleResetPassword = async () => {

    setisLoading(true);
    setIsPasswordInvalid(false);
    setIsConfirmPasswordInvalid(false);
    if(newPassword.length===0){
      setIsPasswordInvalid(true);
      toast.error("please enter a valid password");
      setisLoading(false);
      return;
    }
    if(confirmPassword.length===0){
      setIsConfirmPasswordInvalid(true);
      toast.error("please enter a valid password");
      return;
    }
    try {
      const response = await myInstance.post(
        "/organization/auth/reset-password",
        {
          email,
          resetToken,
          newPassword,
            confirmPassword,
        }
      );

      toast.success(response.data.message);
      setisLoading(false);
        router.push("/login")
    } catch (e) {
       setisLoading(false);
      console.error(e);
    }
  };

  return (
    <div className=" min-h-screen flex justify-center items-center p-2">
      <div className="bg-stone-900 p-8 rounded-lg shadow-lg w-96 text-center">
        <button 
        onClick={()=>{
            router.push("/login")
        }}
        className="absolute top-4 left-4 text-white text-xl hover:text-blue-400 transition-all duration-300">
          <div className="flex gap-3">
            <FaArrowLeft size={30}/>
            <div className="text-">go back to login</div>
          </div>
        </button>
        <h2 className="text-2xl font-medium text-white mb-6">Reset Password</h2>
        <div className="flex flex-col gap-4 justify-start">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email ?? ""}
            readOnly
            className=" text-white"
          />
          <Input
            label="Reset Token"
            type="text"
            placeholder="Enter your reset token"
            value={resetToken ?? ""}
            className=""
          />
          <Input
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            isInvalid={isPasswordInvalid}
            errorMessage={"please enter a valid password"}

          />
           <Input
            label="confirm Password"
            type="password"
            placeholder="Enter your new password"
            value={confirmPassword}
            isInvalid={isConfirmPasswordInvalid}
            onChange={(e) => setConfirmPassword(e.target.value)}
            errorMessage={"please enter a valid password"}
            className=""
          />
          <Button
            className="bg-black dark:bg-white text-black"
            size="sm"
            spinner={<Spinner size="sm" color="default" />}
            isLoading={loading}
            onClick={() => {
              handleResetPassword();
            }}
          >
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
