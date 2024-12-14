import { myInstanceNEXT } from "@/utils/Axios/axios"
import getCookies from "@/utils/cookies/getCookies"
import UploadCertificates from "@/components/pageComponents/certificates/organization/uploadCertificates"



const Page = async () => {

    return (
        <div className="p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 ">
         <div className="h-full flex p-2 ">
      <div className="flex flex-col w-full">
      <div className="flex flex-col h-full overflow-hidden  ">
         <UploadCertificates  />
      </div>
    </div>
  </div>
        </div>
    )
}


export default Page