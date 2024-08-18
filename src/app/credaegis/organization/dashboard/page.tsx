
import React from "react";
import { toast } from "sonner";
import { useEffect,useState } from "react";
import { myInstanceNEXT } from "@/utils/Axios/axios";
import axios from "axios";
import ClusterList from "@/components/pageComponents/dashboard/clusterList";
import { Suspense } from "react";
import getCookies from "@/utils/cookies/getCookies";
import {Card, Skeleton} from "@nextui-org/react";


const fetchClusters = async () => {

  const cookies = getCookies();
  console.log(cookies);
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  try{
  const response = await myInstanceNEXT.get("/cluster/getall",{
    headers: {
        cookie:`test=${cookies}`
    }
    
  });
  return response.data.clusters;
  }
  catch(error: any){
    // console.log(error);
    // toast.error(error.response?.data.message || "An error occurred");
  }
  
}

const  Page =async () => {


  // const [clusters, setClusters] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => { 
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     try{

  //     const response = await myInstance.get("/cluster/getall");
      
  //     console.log(response);
  //     setClusters(response.data.clusters);
  //     }
  //     catch(error: any){
  //       console.log(error);
  //       toast.error(error.response?.data.message || "An error occurred");
  //     }
      
  //   }
  //   fetchData();

    
  // }, []);

  const clusters = await fetchClusters();


  return (
    
    <div className="p-6 h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="flex flex-col lg:flex-row h-full gap-6">
        
        
        <div className="flex flex-col lg:w-1/3 order-2 lg:order-1 gap-6">
       
          <div className="bg-white h-1/2 dark:bg-black border border-gray-200 dark:border-stone-800 rounded-lg shadow-lg p-6 transition-colors duration-300 flex-1 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Clusters</h2>
          
            <ClusterList clusters={clusters} />
          </div>
        
          <div className="bg-white h-1/2 dark:bg-black border border-gray-200 dark:border-stone-800 rounded-lg shadow-lg p-6 transition-colors duration-300 flex-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Events</h2>
            
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
