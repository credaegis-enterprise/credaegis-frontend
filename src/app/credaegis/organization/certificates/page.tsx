import { myInstanceNEXT } from "@/utils/Axios/axios"
import getCookies from "@/utils/cookies/getCookies"
import ManageAll from "@/components/pageComponents/certificates/manageAll"

const fetchEvents = async () => {

    const cookie = getCookies()
    try {
        const response = await myInstanceNEXT.get("/event/getall",{
            headers: {
                cookie: `test=${cookie}`
            }
            
        })
       
        const modifiedData = response.data.events.map((event: any) => {
            return {
               event_ulid: event.event_ulid,
                event_name: event.event_name,
                deleted: event.deleted,
                created_at: event.created_at,
                updated_at: event.updated_at,
                cluster_ulid: event.cluster_ulid
            }
        })

        return modifiedData
    } catch (error: any) {
        console.log(error)
    }

}


const fetchClusters = async () => {
    const cookies = getCookies()
    try{
    const response = await myInstanceNEXT.get("/cluster/getall",{
      headers: {
          cookie:`test=${cookies}`
      }
      
    });
    return response.data.clusters;
    }
    catch(error: any){
      console.log(error);
    }
}



const Page = async () => {


    const clustersPromise = fetchClusters();
    const eventsPromise = fetchEvents();
    const [clusters, events] = await Promise.all([clustersPromise, eventsPromise]);
    console.log(clusters)
    console.log(events)
    return (
        <div className="p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 ">
          <ManageAll eventInfo={events} />
        </div>
    )
}


export default Page