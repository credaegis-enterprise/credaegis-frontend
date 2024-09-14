
'use client';
import MyFileList from "./myFileList"
import  {  useState } from "react";
import { Event,FileInfo,MyFileType } from "@/types/global.types";
import MyFileMeta from "./myfileMeta";
import { filesMetaType } from "@/types/global.types";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";




interface UploadCertificatesProps {
    eventInfo: Event[];
  }



const UploadCertificates: React.FC<UploadCertificatesProps> = ({ eventInfo }) => {


    const [fileUrl, setFileUrl] = useState<FileInfo | null>(null);
    const [fileCount, setFileCount] = useState<number>(0);
    const [filesMetaInfo, setFilesMetaInfo] = useState<filesMetaType[]>([]);


    const uploadCertificatesForApproval = async (selectedFiles:MyFileType[],event_ulid:string) => {

        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append("approvals", file);
        });
      
        const meta = filesMetaInfo.map((file) => {
            return {
                filename: file.filename,
                name: file.name,
                email: file.email,
                expiryDate: file.expiryDate || null,
                comment: file.Comment || null,
                
            }
        })

        formData.append("metadata", JSON.stringify(meta));
        console.log(event_ulid)


        try {
            const response = await myInstance.post(`/certificates/upload/${event_ulid}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message);
           
            }
        } catch (error) {
            console.log(error);

        }
        
      }


    return(
        <div className="h-full overflow-hidden">
           <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 h-full">
            <div className="col-span-2 border dark:border-stone-800 rounded-lg overflow-auto">
            <MyFileList eventInfo={eventInfo} setFileUrl={setFileUrl} fileUrl={fileUrl} setFileCount={setFileCount}  filesMetaInfo={filesMetaInfo} setFilesMetaInfo={setFilesMetaInfo}
             uploadCertificatesForApproval={uploadCertificatesForApproval} />
            </div>
            <div className="col-span-2 border dark:border-stone-800 rounded-lg ">
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