import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";
import { MdSearch } from "react-icons/md";
import { debounce, set } from "lodash";

import { useState } from "react";
import { myInstance } from "@/utils/Axios/axios";

interface ApproveCertificatesProps {}

interface clusterType {
  cluster_name: string;
  cluster_ulid: string;
}

interface eventType {
  event_name: string;
  event_ulid: string;
  cluster_ulid: string;
  cluster_name: string;
}

const ApprovalControl: React.FC<ApproveCertificatesProps> = ({}) => {
  const [clusterList, setClusterList] = useState<clusterType[]>([]);
  const [eventList, setEventList] = useState<eventType[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<string|null>();
  const [selectedEvent, setSelectedEvent] = useState<string|null>("");

  const debouncedSearchClusters = debounce(async (value: string) => {
    try {
      const response = await myInstance.get(
        `/search/cluster?cluster_name=${value}`
      );

      setClusterList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }, 300);

  const debouncedSearchEvents = debounce(async (value: string,id:string) => {
    try {
      const response = await myInstance.get(
        `/search/event?event_name=${value}&cluster_ulid=${id}`
      );

      setEventList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }, 300);

  const searchClusters = async (value: string) => {
    debouncedSearchClusters(value);
  };

  const searchEvents = async (value: string) => {
    let id = selectedCluster;
    if(id == null){
      id = ""
    }
    debouncedSearchEvents(value,id);
  };


  const handleEventSelection = (key: string) => {

    if(selectedCluster == null){
    const updatedClusterList = [...clusterList];
    const event = eventList.find((event) => event.event_ulid === key);
    if(event){
        updatedClusterList.push({cluster_name: event.cluster_name, cluster_ulid: event.cluster_ulid});
        setClusterList(updatedClusterList);
        setSelectedCluster(event.cluster_ulid);
    } 
    setClusterList(updatedClusterList);
}
    setSelectedEvent(key);

    
  }

  return (
    <div className="flex flex-col border dark:border-stone-800 border-gray-200 mb-2 rounded-lg p-2 ">
      <div className="flex text-lg font-medium ml-2">
        <MdSearch size={26} />
        <div>Search and Filter</div>
      </div>
      <div className="flex flex-col lg:flex-row  gap-4 p-2">
        <Autocomplete
          label=" Cluster"
          placeholder="Select an Event"
          size="sm"
          className=""
          onInputChange={searchClusters}
          selectedKey={selectedCluster}
          onSelectionChange={(key) =>  setSelectedCluster(key as string)}

>
          {clusterList.map((cluster) => (
            <AutocompleteItem
              value={cluster.cluster_name}
              key={cluster.cluster_ulid}
            >
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
            selectedKey={selectedEvent}
            onSelectionChange={(key) =>  handleEventSelection(key as string)}
        >
          {eventList.map((event) => (
            <AutocompleteItem value={event.event_name} key={event.event_ulid}>
              {event.event_name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <div className="flex items-center gap-2">
          <MyButton className="bg-green-400" size="md">
            <span className="text-black text-md font-medium">
              Approve certificates
            </span>
          </MyButton>
          <MyButton className="bg-red-400" size="md">
            <span className="dark:text-black text-white text-md font-medium">
              reject certificates
            </span>
          </MyButton>
          <MyButton className="bg-black dark:bg-white" size="md">
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
