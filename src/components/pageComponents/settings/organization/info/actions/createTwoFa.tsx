'use client';

import { useState,useEffect } from "react";
import { MyButton } from "@/components/buttons/mybutton";
import { toast } from "sonner";
import { Input } from "@nextui-org/react";
import { myInstance } from "@/utils/Axios/axios";
import { MdInfo } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";


interface TwoFaCreateProps {
  setIsOpenTwofa: (value: boolean) => void;
  
}

const CreateTwoFa: React.FC<TwoFaCreateProps> = ({ setIsOpenTwofa }) => {

    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [qrCode, setQrCode] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
 
        const fetchQrCode = async () => {
          setIsLoading(true);
            try {
                const response = await myInstance.post("/settings/generate-twofa");
                setQrCode(response.data.qrcode);
            } catch (error: any) {
               
                console.log(error);
              
            }
            finally{
              setIsLoading(false);
            }
        };
        fetchQrCode();
   
    }, []);

  const handleTwoFa = async () => {
    setIsLoading(true);
     if (otp === "") {
      setIsLoading(false);
      setInvalid(true);
      toast.error("Please fill all the fields");
      return;
     }
    try {
      const response = await myInstance.post("/settings/enable-twofa", {
        otp: otp,
      });
      toast.success(response.data.message);
      setIsOpenTwofa(false);


    } catch (error: any) {
      
      console.log(error);
     
    }
    finally{
      setIsLoading(false);
    }

  
    router.refresh()
   
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 w-full ">
        {!isLoading ? (
        <div className="flex w-full ">
              <Image src={qrCode}  alt="qr code"
              width={500}
              height={500}
              />
       </div>
        ) : (<div className="flex w-full h-full justify-center items-center ">
          <Spinner size="lg" color="current" className="dark:text-white text-black" />
          </div>)}
        <div className="flex gap-3">
          <MdInfo className="text-green-400" size={26}/>
          <div className=" text-green-400 text-sm">
            Scan the QR code with your 2FA app and enter the code to enable 2FA.
          </div>
        </div>
        <Input
          isInvalid={invalid}
          errorMessage="Please fill all the fields"
          isRequired={true}
          placeholder="Enter your 2FA code"
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
       
        <MyButton
          size="md"
          className="bg-black dark:bg-white text-white dark:text-black"
          spinner={<Spinner size="sm" color="default" />}
          isLoading={isLoading}
          onClick={() => {
            handleTwoFa();
          }}
        >
          <span className="">
            Enable
          </span>
        </MyButton>
      </div>
    </div>
  );
};



export default CreateTwoFa;