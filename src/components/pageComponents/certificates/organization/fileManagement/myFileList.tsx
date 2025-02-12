"use client";

import { useState, useRef, use, useEffect } from "react";
import { HiDocumentText } from "react-icons/hi";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { MyButton } from "@/components/buttons/mybutton";
import { MdCheck, MdClose } from "react-icons/md";
import { toast } from "sonner";
import { debounce } from "lodash";
import { myInstance } from "@/utils/Axios/axios";
import { FileInfo, filesMetaType, MyFileType } from "@/types/global.types";
import { ulid } from "ulid";
import { Spinner } from "@nextui-org/react";
import { EventSearchInfoType } from "@/types/event.types";

interface MyFileListProps {
  loading: boolean;
  setFileUrl: (file: FileInfo | null) => void;
  fileUrl: FileInfo | null;
  filesMetaInfo: filesMetaType[] | null;
  setFileCount: (count: number) => void;
  setFilesMetaInfo: (filesMetaInfo: filesMetaType[] | []) => void;
  uploadCertificatesForApproval: (
    selectedFiles: MyFileType[],
    event_ulid: string
  ) => void;
  uploadSuccess: boolean;
}

const MyFileList: React.FC<MyFileListProps> = ({
  loading,
  setFileUrl,
  fileUrl,
  setFileCount,
  filesMetaInfo,
  setFilesMetaInfo,
  uploadCertificatesForApproval,
  uploadSuccess,

}) => {
  const [selectedFiles, setSelectedFiles] = useState<MyFileType[]>([]);
  const [event, setEvent] = useState<string | null>(null);
  const [eventInfo, setEventInfo] = useState<EventSearchInfoType[]>([]);
  console.log(event);
  const inputFile = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    inputFile.current?.click();
  };

  useEffect(() => {
    setSelectedFiles([]);
    setFileUrl(null);
    setFileCount(0);
    setFilesMetaInfo([]);
    setEvent(null);
  }, [uploadSuccess]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = e.target;

      if (!files || files.length === 0) {
        toast.info("No file selected. Please choose a file.");
        return;
      }
      if (e.target.files) {
        const filesArray = Array.from(e.target.files)
        .filter((file) => {
          if (file.type !== "application/pdf") {
            toast.warning(`"${file.name}" is not a PDF file. Please upload only PDFs.`);
            return false;
          }
          return true;
        })
        .map((file) => {
          const newFile = file as MyFileType;
          newFile.id = ulid();
          return newFile;
        });

      if (filesArray.length === 0) {
        return; // No valid PDF files selected
      }

      if (selectedFiles && selectedFiles.length === 0) {
        setFileUrl({
          filename: filesArray[0].name,
          fileurl: URL.createObjectURL(filesArray[0]),
          fileindex: filesArray[0].id,
        });
      }

        if (selectedFiles.length < 10) {
          if (filesArray.length + selectedFiles.length > 10) {
            toast.warning(
              "You can only upload a maximum of 10 files at a time"
            );
          }

          const newFiles = filesArray.slice(0, 10 - selectedFiles.length);
          console.log(newFiles);
          const tempFiles = [...selectedFiles, ...newFiles];
          const fileSet = new Set();
          for (const file of tempFiles) {
            if (!fileSet.has(file.name)) {
              fileSet.add(file.name);
            } else {
              toast.warning("Duplicate file names are not allowed");
              return;
            }
          }

          setSelectedFiles((prev) => [...prev, ...newFiles]);
          setFileCount(newFiles.length + selectedFiles.length);
        } else {
          toast.warning("You can only upload a maximum of 10 files at a time");
        }
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
    console.log(filesMetaInfo);
    setFileCount(selectedFiles.length - 1);
    if (fileUrl?.filename === selectedFiles[index].name) {
      setFileUrl(null);
    }
    const newFiles = [...selectedFiles];
    const updatedFilesMetaInfo = filesMetaInfo?.filter(
      (meta) => meta.id !== selectedFiles[index].id
    );

    setFilesMetaInfo(updatedFilesMetaInfo || []);
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const debouncedSearchEvents = debounce(async (value: string, id: string) => {
    if (value === "") {
      setEventInfo([]);
      return;
    }
    try {
      const response = await myInstance.get(
        `/organization/event-control/event/name/search?name=${value}`
      );

      setEventInfo(response.data.responseData);
    } catch (err) {
      console.log(err);
    }
  }, 300);

  const searchEvents = async (value: string) => {
    let id = event || "";
    debouncedSearchEvents(value, id);
  };

  console.log(selectedFiles);
  return (
    <div className="h-full w-full flex flex-col gap-2 ">
      <div className="flex justify-between p-2">
        <div className="flex gap-2 mt-1 ">
          <HiDocumentText size={26} />
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Certificates
          </div>
          <div className="ml-3 text-xl font-medium text-gray-800 dark:text-gray-200">
            {selectedFiles.length}/10
          </div>
        </div>
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
        <MyButton
          className="bg-black dark:bg-white"
          size="sm"
          onClick={() => {
            handleUploadClick();
          }}
        >
          <span className="dark:text-black text-white text-md font-medium">
            Choose files
          </span>
        </MyButton>
      </div>
      <div className="flex  p-2">
        <Autocomplete
          isRequired
          label=" Event"
          placeholder="Select an Event"
          size="sm"
          className=""
          selectedKey={event}
          onInputChange={searchEvents}
          onSelectionChange={(key) => setEvent(key as string | null)}
        >
          {eventInfo.map((event) => (
            <AutocompleteItem key={event.id} value={event.name}>
              {event.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>

      <div className=" flex flex-col lg:h-full h-[200px] overflow-auto mt-2 ">
        <div className="space-y-2 p-2 mt-1 h-full ">
          {selectedFiles.length === 0 ? (
            <div className="flex h-full justify-center items-center text-lg   ">
              <div className="mb-20">No files uploaded.</div>
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
                    {filesMetaInfo?.find((meta) => meta.id === file.id) && (
                      <MdCheck size={20} className="text-green-500" />
                    )}
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
          <div className="flex justify-center mt-4 gap-2">
            <MyButton
              className="bg-black dark:bg-white"
              size="md"
              onClick={() => {
                setSelectedFiles([]);
                setFileUrl(null);
                setFileCount(0);
                setFilesMetaInfo([]);
              }}
            >
              <span className="dark:text-black text-white text-md font-medium">
                Clear All
              </span>
            </MyButton>
            <MyButton
              className="bg-black dark:bg-white"
              spinner={<Spinner size="md" />}
              isLoading={loading}
              size="md"
              onClick={() => {
                uploadCertificatesForApproval(selectedFiles, event || "");
              }}
            >
              <span className="dark:text-black text-white text-md font-medium">
                Upload All files
              </span>
            </MyButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFileList;
