
import React from "react";

import { myInstanceNEXT } from "@/utils/Axios/axios";
import getCookies from "@/utils/cookies/getCookies";
import ClusterView from "@/components/pageComponents/dashboard/organization/clusterView";
import ManageAll from "@/components/pageComponents/dashboard/organization/manageAll";
import { StatisticsType } from "@/types/global.types";

const fetchClusters = async () => {

  const cookies = getCookies();
  try{
  const response = await myInstanceNEXT.get("/organization/cluster-control/get-clusters",{
    headers: {
        cookie:`SESSION=${cookies}`
    }
    
  });
  return response.data.responseData;
  }
  catch(error: any){
    // console.log(error);
  }
  
}

const fetchStats = async () => {
  const cookies = getCookies();
  try{
  const response = await myInstanceNEXT.get("/organization/cluster-control/statistics/get-all",{
    headers: {
        cookie:`test=${cookies}`
    }
    
  });
    return response.data.statistics;
  }
  catch(error: any){
    // console.log(error);
  }
  
}


const  Page =async () => {


  const clustersPromise = fetchClusters();
  const statsPromise = fetchStats();
  const [clusters,stats] = await Promise.all([clustersPromise,statsPromise]);



  return (
    
    <div className="  p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 overflow-hidden">
     <div className="grid grid-cols-8 h-full gap-4 ">
      <div className="lg:col-span-2 h-full col-span-full overflow-auto border border-gray-200 dark:border-stone-800 rounded-lg p-2">
      <ClusterView clusters={clusters}/>
      </div>
      <div className="lg:col-span-6 p-2 h-full overflow-auto col-span-full rounded-lg flex flex-col gap-4 border border-gray-200 dark:border-stone-800">
         <ManageAll stats={stats}  />
      </div>
     </div>
    </div>
  );
};

export default Page;
