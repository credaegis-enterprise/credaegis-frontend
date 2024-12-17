
import ManageAll from "@/components/pageComponents/approvals/organization/manageAll"
import { myInstanceNEXT } from "@/utils/Axios/axios"
import { ApprovalsType, issuedCertificatesType } from "@/types/global.types"
import getCookies from "@/utils/cookies/getCookies"
import { ApprovalInfoType } from "@/types/approvalInfo.type"
import { select } from "@nextui-org/react"
import { CertificateInfoType } from "@/types/issuedCertificateInfo.types"


const fetchApprovals = async () => {
    const cookie = getCookies("ORGANIZATION_SESSION")
    try {
        const response = await myInstanceNEXT.get("/organization/approval-control/get-all", {
            headers: {
                cookie: `ORGANIZATION_SESSION=${cookie}`
            }
        })
        if(response.data.responseData.length === 0){
            return []
        }
       
        return response.data.responseData
    } catch (error: any) {
        console.log(error)
    }
}


const fetchIssuedCount = async () => {
    const cookie = getCookies("ORGANIZATION_SESSION")
    try {
        const response = await myInstanceNEXT.get("/organization/certificate-control/issued/get-count", {
            headers: {
                cookie: `ORGANIZATION_SESSION=${cookie}`
            }
        })
        return response.data.responseData.count
    } catch (error: any) {
        console.log(error)
    }
}


const fetchIssuedCertificates = async () => {
    const cookie = getCookies("ORGANIZATION_SESSION")
    try {
        const response = await myInstanceNEXT.get("/organization/certificate-control/get-latest?page=0&size=5", {
            headers: {
                cookie: `ORGANIZATION_SESSION=${cookie}`
            }
        })
        if(response.data.responseData?.length === 0){
            return []
        }
        const  updatedResult:CertificateInfoType[] = response.data.responseData.map((Certificate:any) => {
            return {
                ...Certificate,
                selected: false
            }
        }
        )

        return updatedResult

    
    } catch (error: any) {
        console.log(error)
    }
}

const page = async () => {


   const approvalsPromise = fetchApprovals()
   const issuedCountPromise = fetchIssuedCount()
    const certificatesPromise = fetchIssuedCertificates()
    const [approvals, issuedCount,issuedCertificates] = await Promise.all([approvalsPromise, issuedCountPromise,certificatesPromise])
    console.log(issuedCount)

    return (
        <div className="p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 ">
        <ManageAll approvalsInfo={approvals || []} issuedInfo={issuedCertificates||[]} issuedCount={issuedCount}/>
     </div>
        
    )
}

export default page