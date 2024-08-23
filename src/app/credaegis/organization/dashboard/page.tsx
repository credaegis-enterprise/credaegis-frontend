
import React from "react";
import { toast } from "sonner";
import { myInstanceNEXT } from "@/utils/Axios/axios";
import axios from "axios";
import ClusterList from "@/components/pageComponents/dashboard/clusterList";
import { Suspense } from "react";
import getCookies from "@/utils/cookies/getCookies";
import ClusterView from "@/components/pageComponents/dashboard/organization/clusterView";
import {Card, Skeleton} from "@nextui-org/react";
import EventList from "@/components/pageComponents/dashboard/eventList";
import { MdPeople } from "react-icons/md";
import CardHeader from "@/components/pageComponents/dashboard/cardHeader";
import CreateCluster from "@/components/pageComponents/dashboard/createCluster";
import CreateEvent from "@/components/pageComponents/dashboard/organization/createEvent";
import ManageAll from "@/components/pageComponents/dashboard/manageAll";

const fetchClusters = async () => {

  const cookies = getCookies();
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
    toast.error(error.response?.data.message || "An error occurred");
  }
  
}

const fetchEvents = async () => {
  const cookies = getCookies();
  try{
    const response = await myInstanceNEXT.get("/event/getall",{
      headers: {
          cookie:`test=${cookies}`
      }
      
    });
    return response.data.events;
    }
    catch(error: any){
      console.log(error);
      toast.error(error.response?.data.message || "An error occurred");
    }
}

const  Page =async () => {




  const clustersPromise = fetchClusters();
  const [clusters] = await Promise.all([clustersPromise]);



  return (
    
    <div className="p-6 h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="flex flex-col lg:flex-row h-full gap-6">
        
        
        <div className="flex flex-col lg:w-1/3 order-2 lg:order-1 gap-6">
       
          <div className="bg-white h-full dark:bg-black border border-gray-200 dark:border-stone-800 rounded-lg shadow-lg p-6 transition-colors duration-300 flex-1 ">
         {/* <CardHeader title="Clusters" icon={<MdPeople size={26} />} buttonTitle="Add" modalTitle="Create a Cluster"  modalContent={<CreateCluster/>}/>
          
          <div className="h-[300px] overflow-auto">
            <ClusterList clusters={clusters} />
          </div> */}
          <ClusterView clusters={clusters}/>
          </div>
        
          {/* <div className="bg-white h-1/2 dark:bg-black border border-gray-200 dark:border-stone-800 rounded-lg shadow-lg p-6 transition-colors duration-300 flex-1 ">
          <CardHeader title="Manage Events" icon={<MdEvent size={26} />} buttonTitle="Add" modalTitle="Add an event"  modalContent={<CreateEvent availableClusters={clusters}/>}/>
            <div className="h-[300px] overflow-y-auto">
            <EventList events={events} />
            </div>
          </div> */}
        </div>
        <div className="h-full overflow-auto bg-white dark:bg-black border border-gray-200 dark:border-stone-800 rounded-lg shadow-lg p-6 lg:w-2/3 lg:flex-none flex-1 order-1 lg:order-2 transition-colors duration-300">
         <ManageAll/>
          
        </div>
      </div>
    </div>
  );
};

export default Page;
