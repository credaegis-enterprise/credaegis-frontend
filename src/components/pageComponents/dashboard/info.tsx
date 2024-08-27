"use client";





import ClusterInfo from "./organization/clusterInfo";
import { myInstance } from "@/utils/Axios/axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import EventView from "./organization/eventView";
import { useCallback } from "react";
import MemberView from "./organization/memberView";

interface InfoProps {
  cluster_ulid: string;
}

interface MemberInfo {
    created_at: string;
    updated_at: string;
    deactivated: number;
    member_name: string;
    member_ulid: string;
    member_email: string;
}

interface EventInfo {
    deleted: number;
    created_at: string;
    event_name: string;
    event_ulid: string;
    updated_at: string;
    cluster_ulid: string;
}

interface AdminInfo {
    admin_name: string;
    admin_ulid: string;
    admin_email: string;
}

interface clusterDetails {
    cluster_ulid: string;
    cluster_name: string;
    organization_ulid: string;
    created_at: string;
    updated_at: string;
    deactivated: number;
    membersInfo: MemberInfo[];
    eventsInfo: EventInfo[];
    adminInfo: AdminInfo[];
}

interface ResponseData {
    clusterInfo: clusterDetails;
    success: boolean;
    message: string;
}


const Info = ({ cluster_ulid }: InfoProps) => {
  const [eventsInfo, setEventsInfo] = useState([]);
  const [members, setMembers] = useState([]);
  const [clusterDetails, setClusterDetails] = useState<clusterDetails>();

  const fetchClusterInfo = useCallback(async () => {
    try {
      const response = await myInstance.get(`/cluster/getinfo/${cluster_ulid}`);
      const { clusterInfo } = response.data;

      setClusterDetails(clusterInfo);
      setEventsInfo(clusterInfo.eventsInfo);
      setMembers(clusterInfo.membersInfo);
    } catch (error: any) {
      console.error("Error fetching cluster info:", error);
    }
  }, [cluster_ulid]);

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
                    <EventView events={eventsInfo} fetchClusterInfo={fetchClusterInfo} cluster_ulid={cluster_ulid} />
                </div>
                <div className="lg:col-span-1 col-span-full h-full rounded-lg overflow-auto border border-gray-200 dark:border-stone-800 p-4">
                   <MemberView members={members} fetchClusterInfo={fetchClusterInfo} cluster_ulid={cluster_ulid} />
                </div>
                </div>
        </div>
       
        </div>

   
  );
};

export default Info;
