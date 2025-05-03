"use client";

import { useState,useEffect } from "react";
import CertificateInfo from "./verifyManagement/certificateInfo";
import CertificateList from "./verifyManagement/certificateList";
import { MyButton } from "@/components/buttons/mybutton";
import { FileInfo,MyFileType } from "@/types/global.types";
import { MdCheckCircle } from "react-icons/md";
import { verificationResponseType } from "@/types/certificateVerificationTypes";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import { ThemeSwitcher } from "@/components/themes/themeSwitcher";
import { GrRevert } from "react-icons/gr";



const VerifyCertificates = () => {
    const router = useRouter();

  const [fileUrl, setFileUrl] = useState<FileInfo | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<MyFileType[]>([]);
  const [fileCount, setFileCount] = useState<number>(0);
  const [popUp, setPopUp] = useState<boolean>(false);
  const [verificationStatus, setVerificationStatus] = useState<verificationResponseType[]>([]);


  return (
    <div className="flex flex-col h-full overflow-hidden">
      {popUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-200 dark:bg-stone-800 p-6 rounded-lg shadow-lg flex items-center space-x-4">
           <Spinner size="lg" color="current" className="text-black dark:text-white" />
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Please wait, your request is being processed.
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col  ">
        <div className="flex justify-between">
        <div className="flex items-center justify-start p-2 gap-7">
          <MyButton size="sm" className="bg-black dark:bg-white  " onClick={
                () => {

                  const path = localStorage.getItem("path") || "/login";
                  router.push(path)
                }
          }>
            <GrRevert className="text-xl dark:text-black text-white" />

          </MyButton>
          <div className="flex items-center gap-2">
            <MdCheckCircle size={30} className="text-green-500" />
            <div className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Certificate Verification
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2">
          <ThemeSwitcher />
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full overflow-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 h-full ">
          <div className="col-span-2 border dark:border-stone-800 rounded-lg overflow-auto">
            <CertificateList fileUrl={fileUrl} setFileUrl={setFileUrl} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} setPopUp={setPopUp}
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
