
'use client';
import MyFileList from "./myFileList"
import  {  useState } from "react";
import { Event,FileInfo } from "@/types/global.types";
import MyFileMeta from "./myfileMeta";
import exp from "constants";
import { filesMetaType } from "@/types/global.types";



interface UploadCertificatesProps {
    eventInfo: Event[];
  }



const UploadCertificates: React.FC<UploadCertificatesProps> = ({ eventInfo }) => {


    const [fileUrl, setFileUrl] = useState<FileInfo | null>(null);
    const [fileCount, setFileCount] = useState<number>(0);
    const [filesMetaInfo, setFilesMetaInfo] = useState<filesMetaType[]>([]);


    return(
        <div className="h-full">
           <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 h-full">
            <div className="col-span-2 border dark:border-stone-800 rounded-lg">
            <MyFileList eventInfo={eventInfo} setFileUrl={setFileUrl} fileUrl={fileUrl} setFileCount={setFileCount}  filesMetaInfo={filesMetaInfo} setFilesMetaInfo={setFilesMetaInfo} />
            </div>
            <div className="col-span-2 border dark:border-stone-800 rounded-lg">
            <MyFileMeta fileUrl={fileUrl} fileCount={fileCount} filesMetaInfo={filesMetaInfo} setFilesMetaInfo={setFilesMetaInfo} />
            </div>
            <div className="col-span-3 border dark:border-stone-800 rounded-lg">
                {fileUrl ? (
                <iframe src={fileUrl?.fileurl || ""} className="w-full h-full"></iframe>
                ):(

                    <div className="flex items-center justify-center h-full">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                            No file selected
                        </h1>
                    </div>
                )}
                </div>
            </div>
        </div>

    )
}

export default UploadCertificates