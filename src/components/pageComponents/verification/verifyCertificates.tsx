import { useState } from "react"
import CertificateInfo from "./certificateInfo";
import CertificateList from "./certificateList";



const VerifyCertificates = () => {
    const [fileUrl, setFileUrl] = useState<string| null>(null);
    return (
        <div className="h-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 h-full">
        <div className="col-span-2 border dark:border-stone-800 rounded-lg overflow-auto">
        <CertificateList />
        </div>
        <div className="col-span-2 border dark:border-stone-800 rounded-lg overflow-auto ">
         <CertificateInfo />
        </div>
        <div className="col-span-3 border dark:border-stone-800 rounded-lg">
          {fileUrl ? (
            <iframe
              src={fileUrl ? "hello" : ""}
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
    )
}


export default VerifyCertificates