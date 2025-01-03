import { HiDocumentText } from "react-icons/hi";
import { motion } from "framer-motion";
import { MyButton } from "@/components/buttons/mybutton";
import { MdCheck, MdClose } from "react-icons/md";
import { useRef, useState } from "react";
import {
  MyFileType,
  FileInfo,
  verificationStatusType,
  verificationInfoType,
} from "@/types/global.types";
import { toast } from "sonner";
import { ulid } from "ulid";
import { myInstance } from "@/utils/Axios/axios";
import { set } from "lodash";
import { input } from "@nextui-org/react";
import { verificationResponseType } from "@/types/certificateVerificationTypes";

interface MyFileListProps {
  setFileUrl: (file: FileInfo | null) => void;
  fileUrl: FileInfo | null;
  selectedFiles: MyFileType[];
  setSelectedFiles: (files: MyFileType[]) => void;
  fileCount: number;
  setFileCount: (count: number) => void;
  verificationStatus: verificationResponseType[];
  setVerificationStatus: (verificationStatus: verificationResponseType[]) => void;
  setPopUp: (popUp: boolean) => void;
}

const CertificateList: React.FC<MyFileListProps> = ({
  setFileUrl,
  fileUrl,
  selectedFiles,
  setSelectedFiles,
  setFileCount,
  setPopUp,
  fileCount,
  setVerificationStatus,
  verificationStatus,
}) => {
  const inputFile = useRef<HTMLInputElement>(null);

  const handleVerifyCertificates = async () => {
    if (selectedFiles.length === 0) {
      toast.warning("Please upload files to verify");
      return;
    }
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("certificates", file));

    try {
      const response = await myInstance.post(
        "/organization/external/blockchain/verify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response", response);

      if (response.data.success) {
        setVerificationStatus(response.data.responseData);
        toast.success(
          "Successfully checked the authenticity of the certificates"
        );
      }
    } catch (error: any) {
      console.error("Verification error:", error);
    }
    setPopUp(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = e.target;

      if (!files || files.length === 0) {
        toast.info("No file selected. Please choose a file.");
        return;
      }

      const filesArray = Array.from(e.target.files || []).map((file) => {
        const newFile = file as MyFileType;
        newFile.id = ulid();
        return newFile;
      });

      if (selectedFiles.length === 0) {
        setFileUrl({
          filename: filesArray[0].name,
          fileurl: URL.createObjectURL(filesArray[0]),
          fileindex: filesArray[0].id,
        });
      }

      if (selectedFiles.length < 10) {
        if (filesArray.length + selectedFiles.length > 10) {
          toast.warning("You can only upload a maximum of 10 files at a time.");
          return;
        }

        const newFiles = filesArray.slice(0, 10 - selectedFiles.length);
        const tempFiles = [...selectedFiles, ...newFiles];
        const fileSet = new Set(selectedFiles.map((file) => file.name));

        for (const file of newFiles) {
          if (fileSet.has(file.name)) {
            toast.warning("Duplicate file names are not allowed.");
            return;
          }
          fileSet.add(file.name);
        }

        setSelectedFiles(tempFiles);
        setFileCount(tempFiles.length);
      } else {
        toast.warning("You can only upload a maximum of 10 files at a time.");
      }
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("There was an error uploading the file. Please try again.");
    }

    if (inputFile.current) {
      inputFile.current.value = "";
    }
  };

  const handleFileRemove = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    const updatedVerificationStatus = verificationStatus.filter(
      (status) => status.certificateName !== selectedFiles[index].name
    );

    setVerificationStatus(updatedVerificationStatus);

    setSelectedFiles(newFiles);
    setFileCount(newFiles.length);

    if (fileUrl?.filename === selectedFiles[index]?.name) {
      setFileUrl(null);
    }
  };

  return (
    <div className="h-full w-full flex flex-col gap-2 ">
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onInput={handleFileChange}
        multiple
      />
      <div className="flex justify-between p-2 gap-2">
        <div className="flex gap-2 mt-1 ">
          <HiDocumentText size={26} />
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Certificates
          </div>
          <div className="ml-3 text-xl font-medium text-gray-800 dark:text-gray-200">
            {selectedFiles.length}/10
          </div>
        </div>

        <MyButton
          className="bg-black dark:bg-white"
          size="sm"
          onClick={() => {
            inputFile.current?.click();
          }}
        >
          <span className="dark:text-black text-white text-md font-medium">
            Choose files
          </span>
        </MyButton>
      </div>

      <div className=" flex flex-col lg:h-full h-[200px] overflow-auto mt-2 ">
        <div className="space-y-2 p-2 mt-1 h-full ">
          {selectedFiles.length === 0 ? (
            <div className="flex h-full justify-center items-center text-lg   ">
              <div className="mb-18 flex justify-center">
                No files Uploaded.
              </div>
            </div>
          ) : (
            selectedFiles &&
            selectedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.05, delay: index * 0.01 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className={` rounded-lg  p-4  duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer
                      ${
                        fileUrl?.filename === file.name
                          ? "bg-gray-300 dark:bg-stone-700"
                          : "bg-white dark:bg-stone-900"
                      }`}
                onClick={(e) => {
                  setFileUrl({
                    filename: file.name,
                    fileurl: URL.createObjectURL(file),
                    fileindex: file.id,
                  });
                }}
              >
                <div className="flex justify-between">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {file.name}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="group">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full transition-colors duration-300 group-hover:bg-red-500 dark:group-hover:bg-red-700 ">
                        <MdClose
                          size={20}
                          className="dark:text-white text-black group-hover:text-black dark:group-hover:text-white"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleFileRemove(index);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <div className="mb-3">
        {selectedFiles.length > 0 && (
          <div className="flex justify-center mt-4 gap-2 p-2">
            <MyButton
              className="bg-black dark:bg-white"
              size="md"
              onClick={() => {
                setVerificationStatus([]);
                setSelectedFiles([]);
                setFileUrl(null);
                setFileCount(0);
              }}
            >
              <span className="dark:text-black text-white text-md font-medium">
                Clear All
              </span>
            </MyButton>
            <MyButton
              className="bg-black dark:bg-white"
              size="md"
              onClick={() => {
                setPopUp(true);
                handleVerifyCertificates();
              }}
            >
              <span className="dark:text-black text-white text-md font-medium">
                upload to check authenticity
              </span>
            </MyButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateList;
