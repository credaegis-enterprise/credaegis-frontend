"use client";





import ClusterInfo from "./infoCards/clusterInfo";
import { myInstance } from "@/utils/Axios/axios";
import { useState, useEffect } from "react";
import EventInfo from "./infoCards/eventInfo";
import { useCallback } from "react";
import MemberInfo from "./infoCards/memberInfo";
import { ClusterInfoType } from "@/types/global.types";
import { set } from "lodash";


interface InfoProps {
  clusterUlid: string;

}



const Info = ({ clusterUlid }: InfoProps) => {
  const [eventsInfo, setEventsInfo] = useState([]);
  const [members, setMembers] = useState([]);
  const [clusterDetails, setClusterDetails] = useState<ClusterInfoType>();
  const [loading, setLoading] = useState(false);

  const fetchClusterInfo = useCallback(async () => {
    setLoading(true);
    try {


      const response = await myInstance.get(`/cluster-control/organization/get-info/${clusterUlid}`);
      const { clusterInfo } = response.data;

      setClusterDetails(clusterInfo);
      setEventsInfo(clusterInfo.eventsInfo);
      setMembers(clusterInfo.membersInfo);
    } catch (error: any) {
      console.error("Error fetching cluster info:", error);
    }
    finally {
      setLoading(false);
    }

  }, [clusterUlid]);

  useEffect(() => {
    fetchClusterInfo();
  }, [fetchClusterInfo]);
  return (
  
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex flex-col w-full border rounded-lg p-4 dark:border-stone-800 border-gray-200">
        <ClusterInfo cluster={clusterDetails} fetchClusterInfo={fetchClusterInfo} loading={loading} />
      </div>
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-2  h-full gap-3">
          <div className="col-span-1 h-full rounded-lg overflow-auto border border-gray-200 dark:border-stone-800 p-4">
            <EventInfo events={eventsInfo} fetchClusterInfo={fetchClusterInfo} clusterUlid={clusterUlid} loading={loading} />
          </div>
          <div className="col-span-1 h-full rounded-lg overflow-auto border border-gray-200 dark:border-stone-800 p-4">
            <MemberInfo members={members} fetchClusterInfo={fetchClusterInfo} clusterUlid={clusterUlid} loading={loading} />
          </div>
        </div>
        </div>
     </div>

   
  );
};

export default Info;
