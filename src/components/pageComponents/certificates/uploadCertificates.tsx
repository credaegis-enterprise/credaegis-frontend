
'use client';
import MyFileList from "./myFileList"
import  {  useState } from "react";
import { Event } from "@/types/global.types";


interface UploadCertificatesProps {
    eventInfo: Event[];
  }

const UploadCertificates: React.FC<UploadCertificatesProps> = ({ eventInfo }) => {


    const [fileUrl, setFileUrl] = useState<string | null>(null);
    console.log(fileUrl)


    return(
        <div className="h-full">
           <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 h-full">
            <div className="col-span-2 border dark:border-stone-800 rounded-lg">
            <MyFileList eventInfo={eventInfo} setFileUrl={setFileUrl} />
            </div>
            <div className="col-span-2 border dark:border-stone-800 rounded-lg">
                shjdhsk
                </div>
            <div className="col-span-3 border dark:border-stone-800 rounded-lg">
       
                </div>
            </div>
        </div>

    )
}

export default UploadCertificates