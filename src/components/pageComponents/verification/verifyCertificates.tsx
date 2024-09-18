"use client";

import { useState } from "react";
import CertificateInfo from "./certificateInfo";
import CertificateList from "./certificateList";
import { MyButton } from "@/components/buttons/mybutton";

const VerifyCertificates = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col ">
        <div className="flex items-center justify-between p-2 ">
          <MyButton size="sm" className="bg-black dark:bg-white  ">
            <span className="dark:text-black text-white text-md font-medium">
              go back
            </span>
          </MyButton>
        </div>
      </div>
      <div className="flex flex-col h-full ">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 h-full ">
          <div className="col-span-2 border dark:border-stone-800 rounded-lg overflow-auto">
            <CertificateList />
          </div>
          <div className="col-span-2 border dark:border-stone-800 rounded-lg overflow-auto ">
            <CertificateInfo />
          </div>
          <div className="col-span-3 border dark:border-stone-800 rounded-lg">
            {fileUrl ? (
              <iframe
                src={fileUrl ? "hello" : ""}
                className="w-full h-full"
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full mt-6">
                <h1 className="text-lg  text-gray-800 dark:text-gray-200">
                  No file selected to display.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificates;
