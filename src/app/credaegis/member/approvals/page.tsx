
import ManageAll from "@/components/pageComponents/approvals/member/manageAll"
import { myInstanceNEXT } from "@/utils/Axios/axios"
import getCookies from "@/utils/cookies/getCookies"


const fetchApprovals = async () => {
    const cookie = getCookies("CREDAEGIS_SESSION")
    try {
        const response = await myInstanceNEXT.get("/member/approval-control/cluster/get-all", {
            headers: {
                cookie: `CREDAEGIS_SESSION=${cookie}`
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
    const cookie = getCookies("CREDAEGIS_SESSION")
    try {
        const response = await myInstanceNEXT.get("/member/certificate-control/issued/get-count", {
            headers: {
                cookie: `CREDAEGIS_SESSION=${cookie}`
            }
        })
        return response.data.responseData.count
    } catch (error: any) {
        console.log(error)
    }
}


const fetchIssuedCertificates = async () => {
    const cookie = getCookies("CREDAEGIS_SESSION")
    try {
        const response = await myInstanceNEXT.get("/member/certificate-control/cluster/get-latest?page=0&size=5", {
            headers: {
                cookie: `CREDAEGIS_SESSION=${cookie}`
            }
        })
        if(response.data.responseData?.certificates.length === 0){
            return []
        }
       

        return response.data.responseData.certificates
    
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