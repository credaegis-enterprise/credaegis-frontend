"use client";





import ClusterInfo from "./infoCards/clusterInfo";
import { myInstance } from "@/utils/Axios/axios";
import { useState, useEffect } from "react";
import EventInfo from "./infoCards/eventInfo";
import { useCallback } from "react";
import MemberInfo from "./infoCards/memberInfo";
import { ClusterInfoType } from "@/types/global.types";


interface InfoProps {
  clusterUlid: string;
}



const Info = ({ clusterUlid }: InfoProps) => {
  const [eventsInfo, setEventsInfo] = useState([]);
  const [members, setMembers] = useState([]);
  const [clusterDetails, setClusterDetails] = useState<ClusterInfoType>();

  const fetchClusterInfo = useCallback(async () => {
    try {


      const response = await myInstance.get(`/cluster/getinfo/${clusterUlid}`);
      const { clusterInfo } = response.data;

      setClusterDetails(clusterInfo);
      setEventsInfo(clusterInfo.eventsInfo);
      setMembers(clusterInfo.membersInfo);
    } catch (error: any) {
      console.error("Error fetching cluster info:", error);
    }
  }, [clusterUlid]);

  useEffect(() => {
    fetchClusterInfo();
  }, [fetchClusterInfo]);
  return (
    <div className="h-full  mt-2">
        <div className="grid grid-rows-8 h-full gap-3">

            <div className="row-span-2  ">
                <div className="h-full border border-gray-200 dark:border-stone-800 box-border p-6  rounded-lg">
                    <ClusterInfo cluster={clusterDetails} fetchClusterInfo={fetchClusterInfo} />
                </div>
             </div>
             <div className="row-span-6 grid grid-cols-2 gap-4 pb-2">
                <div className="lg:col-span-1 col-span-full h-full rounded-lg overflow-auto border border-gray-200 dark:border-stone-800 p-4">
                    <EventInfo events={eventsInfo} fetchClusterInfo={fetchClusterInfo} clusterUlid={clusterUlid} />
                </div>
                <div className="lg:col-span-1 col-span-full h-full rounded-lg overflow-auto border border-gray-200 dark:border-stone-800 p-4">
                   <MemberInfo members={members} fetchClusterInfo={fetchClusterInfo} clusterUlid={clusterUlid} />
                </div>
                </div>
        </div>
       
        </div>

   
  );
};

export default Info;
