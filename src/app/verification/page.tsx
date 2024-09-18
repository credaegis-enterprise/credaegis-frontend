
'use client';

import VerifyCertificates from "@/components/pageComponents/verification/verifyCertificates";
import { MyButton } from "@/components/buttons/mybutton";

const page = () => {
  return (
    <div className="flex flex-col h-screen">
        <div className="flex justify-between items-center p-2 ml-2 bg-gray-50 dark:bg-black transition-colors duration-300">
            <MyButton size="sm" className="bg-black dark:bg-white">Go back</MyButton>
        </div>
          <div className="p-2 h-full bg-gray-50 dark:bg-black transition-colors duration-300 ">
            <div className="h-full flex p-2 ">
              <div className="flex flex-col w-full h-full">
                <div className="flex flex-col h-full overflow-hidden  ">
                    <VerifyCertificates />

                </div>
              </div>
            </div>
          </div>
    
    </div>
  );
};

export default page;
