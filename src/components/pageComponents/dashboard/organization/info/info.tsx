"use client";





import ClusterInfo from "./infoCards/clusterInfo";
import { myInstance } from "@/utils/Axios/axios";
import { useState, useEffect } from "react";
import EventInfo from "./infoCards/eventInfo";
import { useCallback } from "react";
import MemberInfo from "./infoCards/memberInfo";
import ClusterDetailsResponseType, { EventInfoType, MemberInfoType } from "@/types/clusterInfo.types";




interface InfoProps {
clusterId: string;

}



const Info = ({clusterId }: InfoProps) => {
  const [eventsInfo, setEventsInfo] = useState<EventInfoType[]>([]);
  const [members, setMembers] = useState<MemberInfoType[]>([]);
  const [clusterDetails, setClusterDetails] = useState<ClusterDetailsResponseType>();
  const [loading, setLoading] = useState(false);

  const fetchClusterInfo = useCallback(async () => {
    setLoading(true);
    try {

      const id = clusterId;
      console.log("clusterId", id);
      const response = await myInstance.get(`/organization/cluster-control/get-one/${id}`);
      

      setClusterDetails(response.data.responseData);
      setEventsInfo(response.data.responseData.events || []);
      setMembers(response.data.responseData.members||[]);
    } catch (error: any) {
      console.error("Error fetching cluster info:", error);
    }
    finally {
      setLoading(false);
    }

  }, [clusterId]);

  useEffect(() => {
    fetchClusterInfo();
  }, [fetchClusterInfo]);
  return (
  
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex flex-col w-full border rounded-lg p-4 dark:border-stone-800 border-gray-200">
        {clusterDetails &&
        <ClusterInfo clusterDetails={clusterDetails} fetchClusterInfo={fetchClusterInfo} loading={loading} />
        }
      </div>
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-2  h-full gap-3">
          <div className="col-span-1 h-full rounded-lg overflow-auto border border-gray-200 dark:border-stone-800 p-4">
            <EventInfo events={eventsInfo} fetchClusterInfo={fetchClusterInfo} clusterId={clusterId} loading={loading} />
          </div>
          <div className="col-span-1 h-full rounded-lg overflow-auto border border-gray-200 dark:border-stone-800 p-4">
            <MemberInfo members={members} fetchClusterInfo={fetchClusterInfo} clusterId={clusterId} loading={loading} />
          </div>
        </div>
        </div>
     </div>

   
  );
};

export default Info;
