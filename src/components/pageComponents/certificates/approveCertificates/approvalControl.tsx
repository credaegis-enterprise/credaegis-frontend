import { Autocomplete,AutocompleteItem } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";
import { MdSearch } from "react-icons/md";
import { EventType,ClusterType } from "@/types/global.types";
import { useState } from "react";


interface ApproveCertificatesProps {
    eventInfo: EventType[];
    clusterInfo: ClusterType[];
    }

interface clusterType {
    cluster_name: string;
    cluster_ulid: string;
}

interface eventType {
    event_name: string;
    event_ulid: string;
}



const ApprovalControl: React.FC<ApproveCertificatesProps> = ({ eventInfo,clusterInfo }) => {

    const [clusterList, setClusterList] = useState<clusterType>();
    const [eventList, setEventList] = useState("");

  return (
    <div className="flex flex-col border dark:border-stone-800 border-gray-200 mb-2 rounded-lg p-2 ">
        <div className="flex text-lg font-medium ml-2">
            <MdSearch size={26} />
            <div>
              Search and Filter
            </div>
        
        </div>
        <div className="flex flex-col lg:flex-row  gap-4 p-2">
        <Autocomplete
     
            label=" Cluster"
            placeholder="Select an Event"
            size="sm"
            className=""
        >
           {clusterInfo.map((cluster) => (
            <AutocompleteItem key={cluster.cluster_ulid} value={cluster.cluster_name}>
                {cluster.cluster_name}
            </AutocompleteItem>
              ))}
        </Autocomplete>
        <Autocomplete
            label=" Event"
            placeholder="Select an Event"
            size="sm"
            className=""
        >
              {eventInfo.map((event) => (
                <AutocompleteItem key={event.event_ulid} value={event.event_name}>
                 {event.event_name}
                </AutocompleteItem>
                  ))}
        </Autocomplete>
        <div className="flex items-center gap-2">
        <MyButton 
            className="bg-green-400"
            size="md"
        >
            <span className="text-black text-md font-medium">
           Approve certificates
            </span>
            </MyButton>
            <MyButton
           className="bg-red-400"
            size="md"
        >
            <span className="dark:text-black text-white text-md font-medium">
            reject certificates
            </span>
            </MyButton>
            <MyButton
            className="bg-black dark:bg-white"
            size="md"
        >
            <span className="dark:text-black text-white text-md font-medium">
         Select All
            </span>
            </MyButton>
            </div>

         
        </div>
        
      </div>
  );
};

export default ApprovalControl;
