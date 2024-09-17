import { Autocomplete,AutocompleteItem } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";
import { MdSearch } from "react-icons/md";

import { useState } from "react";
import { myInstance } from "@/utils/Axios/axios";


interface ApproveCertificatesProps {

   
    }

interface clusterType {
    cluster_name: string;
    cluster_ulid: string;
}

interface eventType {
    event_name: string;
    event_ulid: string;
    cluster_ulid: string;
}



const ApprovalControl: React.FC<ApproveCertificatesProps> = ({ }) => {

    const [clusterList, setClusterList] = useState<clusterType[]>([]);
    const [eventList, setEventList] = useState<eventType[]>([]);


    const searchClusters = async (value:string) => {
        console.log(value);
        try{
            const response = await myInstance.get(`/search/cluster?cluster_name=${value}`);
            console.log(response.data.data);
            setClusterList(response.data.data);
            
        }
        catch(err){
            console.log(err);
        }
    }

    const searchEvents = async (value:string) => {
        console.log(value);
        try{
            const response = await myInstance.get(`/search/event?event_name=${value}&cluster_ulid=`);
            console.log(response.data.data);
            setEventList(response.data.data);
            
        }
        catch(err){
            console.log(err);
        }
    }

    

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
            onInputChange={searchClusters}
        >
            {clusterList.map((cluster) => (
                <AutocompleteItem value={cluster.cluster_name} key={cluster.cluster_ulid}>
                    {cluster.cluster_name}
                </AutocompleteItem>
            ))}
            
        </Autocomplete>
        <Autocomplete
            label=" Event"
            placeholder="Select an Event"
            size="sm"
            className=""
            onInputChange={searchEvents}
        >
            {eventList.map((event) => (
                <AutocompleteItem value={event.event_name} key={event.event_ulid}>
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
