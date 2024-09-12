"use client";

import { useState, useRef } from "react";
import { HiDocumentText } from "react-icons/hi";
import { Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { MyButton } from "@/components/buttons/mybutton";

const MyFileList = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputFile = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    console.log("clicked");
    inputFile.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
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
          <SelectItem key="cat">Cat</SelectItem>
          <SelectItem key="dog">Dog</SelectItem>
          <SelectItem key="rabbit">Rabbit</SelectItem>
          <SelectItem key="hamster">Hamster</SelectItem>
        </Select>
      </div>
      <div className=" mt-2  h-full  overflow-auto">
        <div className="space-y-2 p-2 mt-1 h-full">
          {!selectedFiles? (
            <div className="flex h-full justify-center items-center text-lg">
              No files uploaded.
            </div>
          ) : (
         
          
          selectedFiles && selectedFiles.map((file, index) => (
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
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {file.name}
              </h3>
            </motion.div>
          ))
      
          )}
        </div>

      
    </div>
    </div>
  );
};

export default MyFileList;
