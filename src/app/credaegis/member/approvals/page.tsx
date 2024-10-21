
import ManageAll from "@/components/pageComponents/approvals/member/manageAll"
import { myInstanceNEXT } from "@/utils/Axios/axios"
import getCookies from "@/utils/cookies/getCookies"
import { ApprovalsType,issuedCertificatesType } from "@/types/global.types"
import cluster from "cluster"


const fetchApprovals = async () => {
    const cookie = getCookies()
    try {
        const response = await myInstanceNEXT.get("/member/approval-control/get-all", {
            headers: {
                cookie: `test=${cookie}`
            }
        })
        if(response.data.data?.length === 0){
            return []
        }
        console.log(response.data.data)
        const updatedResult: ApprovalsType[] = response.data.data.map(
            (approval: any) => {
              return {
                approval_ulid: approval.approval_ulid,
                approval_file_name: approval.approval_file_name,
                approval_file_ulid: approval.approval_file_ulid,
                comments: approval.comments,
                expiry_date: approval.expiry_date,
                event_name: approval.event_name,
                issued_to_email: approval.issued_to_email,
                issued_to_name: approval.issued_to_name,
                cluster_ulid: approval.cluster_ulid,
                cluster_name: approval.cluster_name,
                event_ulid: approval.event_ulid,
                selected: false,
              };
            }
          );
        return updatedResult
    } catch (error: any) {
        console.log(error)
    }
}

const fetchIssuedCount = async () => {
    const cookie = getCookies()
    try {
        const response = await myInstanceNEXT.get("/member/certificate/get-count", {
            headers: {
                cookie: `test=${cookie}`
            }
        })
        return response.data.data.total_count
    } catch (error: any) {
        console.log(error)
    }
}


const fetchIssuedCertificates = async () => {
    const cookie = getCookies()
    try {
        const response = await myInstanceNEXT.get("/member/certificate/cluster/get-latest?startLimit=0&rowCount=5", {
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
    const issuedCertificatesPromise = fetchIssuedCertificates()
    const issuedCountPromise = fetchIssuedCount()
    
    const [approvals, issuedCertificates,issuedCount] = await Promise.all([approvalsPromise, issuedCertificatesPromise, issuedCountPromise])
    console.log("issued",issuedCount)
    return (
        <div className="p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 ">
        <ManageAll approvalsInfo={approvals||[]} issuedInfo={issuedCertificates||[]} issuedCount={issuedCount} />
     </div>
        
    )
}

export default page