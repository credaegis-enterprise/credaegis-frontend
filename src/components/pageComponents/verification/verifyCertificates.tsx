"use client";

import { useState } from "react";
import CertificateInfo from "./certificateInfo";
import CertificateList from "./certificateList";
import { MyButton } from "@/components/buttons/mybutton";
import { FileInfo,MyFileType } from "@/types/global.types";
import { MdCheckCircle } from "react-icons/md";
import { verificationStatusType } from "@/types/global.types";

const VerifyCertificates = () => {
  const [fileUrl, setFileUrl] = useState<FileInfo | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<MyFileType[]>([]);
  const [fileCount, setFileCount] = useState<number>(0);
  const [verificationStatus, setVerificationStatus] = useState<verificationStatusType[]>([]);


  console.log(verificationStatus);
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col ">
        <div className="flex items-center justify-start p-2 gap-7">
          <MyButton size="sm" className="bg-black dark:bg-white  ">
            <span className="dark:text-black text-white text-md font-medium">
              go back
            </span>
          </MyButton>
          <div className="flex items-center gap-2">
            <MdCheckCircle size={30} className="text-green-500" />
            <div className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Certificate Verification
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full ">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 h-full ">
          <div className="col-span-2 border dark:border-stone-800 rounded-lg overflow-auto">
            <CertificateList fileUrl={fileUrl} setFileUrl={setFileUrl} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}
            fileCount={fileCount} setFileCount={setFileCount} verificationStatus={verificationStatus} setVerificationStatus={setVerificationStatus} />
          </div>
          <div className="col-span-2 border dark:border-stone-800 rounded-lg overflow-auto ">
            <CertificateInfo fileUrl={fileUrl} verificationStatus={verificationStatus} />
          </div>
          <div className="col-span-3 border dark:border-stone-800 rounded-lg">
            {fileUrl ? (
              <iframe
                src={fileUrl?.fileurl || ""}
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
