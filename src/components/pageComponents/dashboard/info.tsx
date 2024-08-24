"use client";


import CardHeader from "./cardHeader";

import { MdInfo } from "react-icons/md";
import { myInstance } from "@/utils/Axios/axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import EventView from "./organization/eventView";
import MemberList from "./memberList";
import MemberView from "./organization/memberView";

interface InfoProps {
  cluster_ulid: string;
}

const Info = ({ cluster_ulid }: InfoProps) => {
  const [eventsInfo, setEventsInfo] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchClusterInfo = async () => {
    try {
      const response = await myInstance.get(`/cluster/getinfo/${cluster_ulid}`);
      console.log(response);
      setEventsInfo(response.data.clusterInfo.eventsInfo);
      setMembers(response.data.clusterInfo.membersInfo);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchClusterInfo();
  }, [cluster_ulid]);
  return (
    <div className="h-full  mt-2">
        <div className="grid grid-rows-8 h-full gap-3">

            <div className="row-span-2  ">
                <div className="h-full border border-gray-200 dark:border-stone-800 p-4  rounded-lg">
                <CardHeader title="Cluster Info" icon={<MdInfo size={26} />} modalTitle="" />
                allenallen
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

    // <div className="flex flex-col h-full w-full gap-4 p-2 mt-3">
    //   <div className="flex w-full   p-4 rounded-lg border border-gray-200 dark:border-stone-800">
    //     <CardHeader
    //       title="Cluster Info"
    //       icon={<MdInfo size={26} />}
    //       modalTitle=""
    //     />
    //     sjhjkshdkjs sldsljds sljdhkshd sdjgjshd s,bdjkshdb sdhsjhd slkdlksj
    //     sjhjkshdkjsd s a fg getinfo fd ss ss ss setPasswordss ss
    //   </div>
    //   <div className="flex flex-col lg:flex-row w-full gap-4 flex-grow h-full  ">
    //     <div className="flex flex-col h-80 overflow-auto lg:h-full lg:w-1/2 w-full border border-gray-200 dark:border-stone-800 rounded-lg p-4">
    //       <EventView events={eventsInfo} fetchClusterInfo={fetchClusterInfo} cluster_ulid={cluster_ulid} />
    //     </div>
    //     <div className="flex flex-col lg:w-1/2 w-full h-80 lg:h-full overflow-auto   p-4 rounded-lg  border border-gray-200 dark:border-stone-800">
    //       <MemberView members={members}  fetchClusterInfo={fetchClusterInfo} cluster_ulid={cluster_ulid}/>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Info;
