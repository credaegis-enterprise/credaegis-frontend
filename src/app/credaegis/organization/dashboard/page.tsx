
import React from "react";
import { toast } from "sonner";
import { useEffect,useState } from "react";
import { myInstanceNEXT } from "@/utils/Axios/axios";
import axios from "axios";
import ClusterList from "@/components/pageComponents/dashboard/clusterList";
import { Suspense } from "react";
import getCookies from "@/utils/cookies/getCookies";
import {Card, Skeleton} from "@nextui-org/react";
import EventList from "@/components/pageComponents/dashboard/eventList";


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
    console.log(response.data.events);
    return response.data.events;
    }
    catch(error: any){
      console.log(error);
      toast.error(error.response?.data.message || "An error occurred");
    }
}

const  Page =async () => {




  const clustersPromise = fetchClusters();
  console.log("sskjkshjkshjkshkjshjks");
  const eventsPromise =  fetchEvents();
  const [clusters,events] = await Promise.all([clustersPromise,eventsPromise]);



  return (
    
    <div className="p-6 h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="flex flex-col lg:flex-row h-full gap-6">
        
        
        <div className="flex flex-col lg:w-1/3 order-2 lg:order-1 gap-6">
       
          <div className="bg-white h-1/2 dark:bg-black border border-gray-200 dark:border-stone-800 rounded-lg shadow-lg p-6 transition-colors duration-300 flex-1 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Manage Clusters</h2>
          
            <ClusterList clusters={clusters} />
          </div>
        
          <div className="bg-white h-1/2 dark:bg-black border border-gray-200 dark:border-stone-800 rounded-lg shadow-lg p-6 transition-colors duration-300 flex-1 overflow-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Events</h2>
            <EventList events={events} />
          </div>
        </div>
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-stone-800 rounded-lg shadow-lg p-6 lg:w-2/3 lg:flex-none flex-1 order-1 lg:order-2 transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Approval</h2>
          
        </div>
      </div>
    </div>
  );
};

export default Page;
