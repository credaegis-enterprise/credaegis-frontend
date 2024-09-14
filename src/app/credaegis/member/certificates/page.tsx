import { myInstanceNEXT } from "@/utils/Axios/axios"
import getCookies from "@/utils/cookies/getCookies"
import ManageAll from "@/components/pageComponents/certificates/manageAll"

const fetchEvents = async () => {

    const cookie = getCookies()
    try {
        const response = await myInstanceNEXT.get("/event/cluster/getall",{
            headers: {
                cookie: `test=${cookie}`
            }
            
        })
        return response.data.eventList
    } catch (error: any) {
        console.log(error)
    }

}



const Page = async () => {


    const events = await fetchEvents()
    console.log(events)
    return (
        <div className="p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 ">
          <ManageAll eventInfo={events}/>
        </div>
    )
}


export default Page