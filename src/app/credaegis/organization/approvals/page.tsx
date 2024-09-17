
import ManageAll from "@/components/pageComponents/approvals/manageAll"
import { myInstanceNEXT } from "@/utils/Axios/axios"
import { ApprovalsType } from "@/types/global.types"
import getCookies from "@/utils/cookies/getCookies"
import cluster from "cluster"

const fetchApprovals = async () => {
    const cookie = getCookies()
    try {
        const response = await myInstanceNEXT.get("/approvals/getall", {
            headers: {
                cookie: `test=${cookie}`
            }
        })
        if(response.data.data?.length === 0){
            return []
        }
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
                event_ulid: approval.event_ulid,
                cluster_ulid: approval.cluster_ulid,
                selected: false,
              };
            }
          );
        return updatedResult
    } catch (error: any) {
        console.log(error)
    }
}

const page = async () => {


    const approvals = (await fetchApprovals()) || []
    console.log(approvals)

    return (
        <div className="p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 ">
        <ManageAll approvalsInfo={approvals}/>
     </div>
        
    )
}

export default page