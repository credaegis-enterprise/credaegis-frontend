'use client';

import { useState,useEffect } from "react";
import { MyButton } from "@/components/buttons/mybutton";
import { toast } from "sonner";
import { Input } from "@nextui-org/react";
import { myInstance } from "@/utils/Axios/axios";
import { MdInfo } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";


interface TwoFaCreateProps {
  setIsOpenTwofa: (value: boolean) => void;
  
}

const CreateTwoFa: React.FC<TwoFaCreateProps> = ({ setIsOpenTwofa }) => {

    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [qrCode, setQrCode] = useState("");
    const [invalid, setInvalid] = useState(false);


    useEffect(() => {
        const fetchQrCode = async () => {
            try {
                const response = await myInstance.post("/settings/generateTwofa");
                setQrCode(response.data.qrcode);
            } catch (error: any) {
               
                console.log(error);
              
            }
        };
        fetchQrCode();
    }, []);

  const handleTwoFa = async () => {
     if (otp === "") {
      setInvalid(true);
      toast.error("Please fill all the fields");
      return;
     }
    try {
      const response = await myInstance.post("/settings/enableTwofa", {
        otp: otp,
      });
      toast.success(response.data.message);
      setIsOpenTwofa(false);


    } catch (error: any) {
      console.log(error);
     
    }
    router.refresh()
   

  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 w-full ">
        <div className="flex w-full ">
              <Image src={qrCode}  alt="qr code"
              width={500}
              height={500}
              />
       </div>
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