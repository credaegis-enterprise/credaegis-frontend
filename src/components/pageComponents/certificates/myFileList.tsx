'use client'

import { useState,useRef } from "react";
import { HiDocumentText } from "react-icons/hi";
import { Select, SelectItem } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";

const MyFileList = () => {

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const inputFile = useRef<HTMLInputElement>(null);
    const handleUploadClick = () => {
        console.log("clicked");
        inputFile.current?.click();
    }

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
        <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={handleFileChange} multiple/>
        <MyButton className="bg-black dark:bg-white" size="sm" onClick={()=>{handleUploadClick()}}>
       
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
    </div>
  );
};

export default MyFileList;
