"use client";
import MyFileList from "./fileManagement/myFileList";
import { useState } from "react";
import { EventType, FileInfo, MyFileType } from "@/types/global.types";
import MyFileMeta from "./fileManagement/myfileMeta";
import { filesMetaType } from "@/types/global.types";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/react";


const UploadCertificates = () => {
  const [fileUrl, setFileUrl] = useState<FileInfo | null>(null);
  const [fileCount, setFileCount] = useState<number>(0);
  const [filesMetaInfo, setFilesMetaInfo] = useState<filesMetaType[]>([]);
 const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
 const [loading, setLoading] = useState<boolean>(false);

  const uploadCertificatesForApproval = async (
    selectedFiles: MyFileType[],
    event_ulid: string
  ) => {
    
   

    if(selectedFiles.length !== filesMetaInfo.length){
        toast.error("Please fill in the metadata for all the files");
        return;
        }
    if(event_ulid === ""){
        toast.error("Please select an event");
        return;
    }

    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      if(file.size > 1000000){
        toast.error(`File ${file.name}  size should be less than 1MB`);
        setLoading(false);
        return;
      }
      formData.append("approvals", file);
    });

    const meta = filesMetaInfo.map((file) => {
      return {
        fileName: file.filename,
        recipientName: file.name,
        recipientEmail: file.email,
        expiryDate: file.expiryDate || null,
        comments: file.Comment || null,
      };
    });

    formData.append("info", JSON.stringify(meta));
    console.log(event_ulid);

    try {
      const response = await myInstance.post(
        `/member/approval-control/upload/${event_ulid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        setUploadSuccess((prev) => !prev);
        
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="h-full overflow-hidden">
       {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-200 dark:bg-stone-800 p-6 rounded-lg shadow-lg flex items-center space-x-4">
           <Spinner size="lg" color="current" className="text-black dark:text-white" />
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Please wait, the files are uploading for approval.
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 h-full">
        <div className="col-span-2 border dark:border-stone-800 rounded-lg overflow-auto">
          <MyFileList
            loading={loading}
            setFileUrl={setFileUrl}
            fileUrl={fileUrl}
            setFileCount={setFileCount}
            filesMetaInfo={filesMetaInfo}
            setFilesMetaInfo={setFilesMetaInfo}
            uploadSuccess={uploadSuccess}
            uploadCertificatesForApproval={uploadCertificatesForApproval}
          />
        </div>
        <div className="col-span-2 border dark:border-stone-800 rounded-lg overflow-auto ">
          <MyFileMeta
            fileUrl={fileUrl}
            fileCount={fileCount}
            filesMetaInfo={filesMetaInfo}
            setFilesMetaInfo={setFilesMetaInfo}
          />
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
  );
};

export default UploadCertificates;
