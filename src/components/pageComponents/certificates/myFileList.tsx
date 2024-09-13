"use client";

import { useState, useRef } from "react";
import { HiDocumentText } from "react-icons/hi";
import { Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { MyButton } from "@/components/buttons/mybutton";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";
import { Event, FileInfo } from "@/types/global.types";

interface MyFileListProps {
  eventInfo: Event[];
  setFileUrl: (file: FileInfo | null) => void;
  fileUrl: FileInfo | null;
  setFileCount: (count: number) => void;
}

const MyFileList: React.FC<MyFileListProps> = ({
  eventInfo,
  setFileUrl,
  fileUrl,
  setFileCount,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  console.log(eventInfo);
  const inputFile = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    console.log("clicked");
    inputFile.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (selectedFiles.length === 0) {
        setFileUrl({
          filename: filesArray[0].name,
          fileurl: URL.createObjectURL(filesArray[0]),
          fileindex: 0,
        });
      }

      if (selectedFiles.length < 10) {
        if (filesArray.length + selectedFiles.length > 10) {
          toast.warning("You can only upload a maximum of 10 files at a time");
        }

        const newFiles = filesArray.slice(0, 10 - selectedFiles.length);
        console.log(newFiles);
        setSelectedFiles((prev) => [...prev, ...newFiles]);
        setFileCount(newFiles.length + selectedFiles.length);
      } else {
        toast.warning("You can only upload a maximum of 10 files at a time");
      }
    }
  };

  const handleFileRemove = (index: number) => {
    setFileCount(selectedFiles.length - 1);
    if (fileUrl?.filename === selectedFiles[index].name) {
      setFileUrl(null);
    }

    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
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
            upload
          </span>
        </MyButton>
      </div>
      <div className="flex  p-2">
        <Select
          isRequired
          label=" Event"
          placeholder="Select an Event in your cluster to upload"
          size="sm"
          className=""
        >
          {eventInfo &&
            eventInfo.map((event, index) => (
              <SelectItem key={event.event_ulid} value={event.event_name}>
                {event.event_name}
              </SelectItem>
            ))}
        </Select>
      </div>
      <div className=" mt-2  h-full  overflow-auto">
        <div className="space-y-2 p-2 mt-1 h-full">
          {selectedFiles.length === 0 ? (
            <div className="flex h-full justify-center items-center text-lg  ">
              No files uploaded.
            </div>
          ) : (
            selectedFiles &&
            selectedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer"
                onClick={(e) => {
                  setFileUrl({
                    filename: file.name,
                    fileurl: URL.createObjectURL(file),
                    fileindex: index,
                  });
                }}
              >
                <div className="flex justify-between">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {file.name}
                  </div>
                  <div className="group">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full transition-colors duration-300 group-hover:bg-gray-200 dark:group-hover:bg-red-700">
                      <MdClose
                        size={20}
                        className="text-white group-hover:text-black dark:group-hover:text-white"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleFileRemove(index);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFileList;
