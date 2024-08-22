'use client';

import EventList from "./eventList";
import CardHeader from "./cardHeader";
import CreateEvent from "./createEvent";
import { MdEvent } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { myInstance } from "@/utils/Axios/axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import MemberList from "./memberList";

interface InfoProps {
    cluster_ulid: string;
}

const Info = ({cluster_ulid}: InfoProps) => {

    const [eventsInfo, setEventsInfo] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchClusterInfo = async () => {
            try
            {
                const response = await myInstance.get(`/cluster/getinfo/${cluster_ulid}`);
                console.log(response.data.clusterInfo);
                setEventsInfo(response.data.clusterInfo.eventsInfo);
                setMembers(response.data.clusterInfo.membersInfo);
                
            }
            catch(error: any){
                console.log(error);
                toast.error(error.response?.data.message || "An error occurred");
            }
        }

        fetchClusterInfo();
    }, [cluster_ulid])
    return(
        <div className="flex flex-col h-full w-full gap-4 p-2 mt-3">
            {/* Full-width section with fixed height */}
            <div className="flex w-full  lg:h-64  p-4 rounded-lg border border-gray-200 dark:border-stone-800">
             <CardHeader title="Cluster Info"  icon={<MdInfo size={26}   />} modalTitle="" />
             sjhjkshdkjs
             sldsljds
             sljdhkshd
             sdjgjshd
             s,bdjkshdb
             sdhsjhd
             slkdlksj
             sjhjkshdkjsd
             s
             a
             fg
             getinfo
             fd
             ss
             ss
             ss
             setPasswordss

             ss
            </div>
            {/* Row that only splits on large screens with flex-grow for full height */}
            <div className="flex flex-col lg:flex-row w-full gap-4 flex-grow mb-8 ">
                <div className="flex flex-col lg:w-1/2 w-full border border-gray-200 dark:border-stone-800 rounded-lg p-4">
            <CardHeader title="Manage Events" icon={<MdEvent size={26} />} buttonTitle="Add" modalTitle="Add an event" />
                <div className="flex flex-col  h-96 overflow-auto  ">
                <EventList events={eventsInfo} />
         
                </div>
                </div>
                <div className="flex flex-col lg:w-1/2 w-full    p-4 rounded-lg  border border-gray-200 dark:border-stone-800">
        
                <CardHeader title="Manage Members" icon={<MdPerson size={26} />} buttonTitle="Add" modalTitle="Add a member" />
                <div className="flex flex-col  h-96 overflow-auto  ">
                <MemberList members={members} />
         
                </div>
                </div>
            </div>
        </div>
    )
}

export default Info;
