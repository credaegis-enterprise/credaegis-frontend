
import React from "react";

import { myInstanceNEXT } from "@/utils/Axios/axios";
import getCookies from "@/utils/cookies/getCookies";
import ClusterView from "@/components/pageComponents/dashboard/organization/clusterView";
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
    }
}

const  Page =async () => {




  const clustersPromise = fetchClusters();
  const [clusters] = await Promise.all([clustersPromise]);



  return (
    
    <div className="  p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 overflow-hidden">
     <div className="grid grid-cols-8 h-full gap-4 ">
      <div className="lg:col-span-2 h-full col-span-full overflow-auto border border-gray-200 dark:border-stone-800 rounded-lg p-2">
      <ClusterView clusters={clusters}/>
      </div>
      <div className="lg:col-span-6 p-2 h-full overflow-auto col-span-full rounded-lg flex flex-col gap-4 border border-gray-200 dark:border-stone-800">
        <ManageAll/>
      </div>
     </div>
    </div>
  );
};

export default Page;
