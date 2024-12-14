
import ManageAll from "@/components/pageComponents/approvals/organization/manageAll"
import { myInstanceNEXT } from "@/utils/Axios/axios"
import { ApprovalsType } from "@/types/global.types"
import getCookies from "@/utils/cookies/getCookies"
import { ApprovalInfoType } from "@/types/approvalInfo.type"
import { select } from "@nextui-org/react"


const fetchApprovals = async () => {
    const cookie = getCookies()
    try {
        const response = await myInstanceNEXT.get("/organization/approval-control/get-all", {
            headers: {
                cookie: `SESSION=${cookie}`
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
    const cookie = getCookies()
    try {
        const response = await myInstanceNEXT.get("/organization/approval-control/get-count?status=pending", {
            headers: {
                cookie: `SESSION=${cookie}`
            }
        })
        return response.data.responseData.count
    } catch (error: any) {
        console.log(error)
    }
}


const fetchIssuedCertificates = async () => {
    const cookie = getCookies()
    try {
        const response = await myInstanceNEXT.get("/organization/certificate/get-latest?startLimit=0&rowCount=5", {
            headers: {
                cookie: `test=${cookie}`
            }
        })
        if(response.data.data?.length === 0){
            return []
        }
        const  updatedResult = response.data.data.map((Certificate:any) => {
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
    const [approvals, issuedCount] = await Promise.all([approvalsPromise, issuedCountPromise])
    console.log(issuedCount)

    return (
        <div className="p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 ">
        <ManageAll approvalsInfo={approvals || []} issuedCount={issuedCount}/>
     </div>
        
    )
}

export default page