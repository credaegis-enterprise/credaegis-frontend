import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";
import { MdSearch } from "react-icons/md";
import { debounce, get, set } from "lodash";
import { ApprovalsType } from "@/types/global.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import { IoReload } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { Spinner } from "@nextui-org/react";

interface ApproveCertificatesProps {
  setApprovalsList: (approvalsList: ApprovalsType[]) => void;
  approvalsList: ApprovalsType[];
  selectedCluster: string | null;
  setSelectedCluster: (cluster: string | null) => void;
  selectedEvent: string | null;
  setSelectedEvent: (event: string | null) => void;
  getApprovals: () => void;


}

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

const ApprovalControl: React.FC<ApproveCertificatesProps> = ({
  setApprovalsList,
  approvalsList,
  selectedCluster,
  setSelectedCluster,
  selectedEvent,
  setSelectedEvent,
  getApprovals
}) => {


  const router = useRouter();
  const [clusterList, setClusterList] = useState<clusterType[]>([]);
  const [eventList, setEventList] = useState<eventType[]>([]);
  const [loading, setLoading] = useState(false);
  // const [selectedCluster, setSelectedCluster] = useState<string | null>();
  // const [selectedEvent, setSelectedEvent] = useState<string | null>("");

  



  const debouncedSearchClusters = debounce(async (value: string) => {
    try {
      const response = await myInstance.get(
        `/organization/cluster-control/search/cluster?clusterName=${value}`
      );

      setClusterList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }, 300);

  const debouncedSearchEvents = debounce(async (value: string, id: string) => {
    try {
      const response = await myInstance.get(
        `/organization/event-control/search/event?eventName=${value}&clusterUlid=${id}`
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
    if (id == null) {
      id = "";
    }
    debouncedSearchEvents(value, id);
  };

  const handleEventSelection = (key: string) => {
    if (selectedCluster == null) {
      const updatedClusterList = [...clusterList];
      const event = eventList.find((event) => event.event_ulid === key);
      if (event) {
        updatedClusterList.push({
          cluster_name: event.cluster_name,
          cluster_ulid: event.cluster_ulid,
        });
        setClusterList(updatedClusterList);
        setSelectedCluster(event.cluster_ulid);
      }
      setClusterList(updatedClusterList);
    }
    setSelectedEvent(key);
  };

  const handleApprove = async () => {
   
    const approvalUlids = approvalsList.reduce<string[]>((acc, approval) => {
        if (approval.selected) {
          acc.push(approval.approval_ulid);
        }
        return acc;
      }, []);

    console.log(approvalUlids);

    if (approvalUlids.length === 0) {
      toast.info("Please select atleast one approval to approve");
      return;
    }

    setLoading(true);

    try {
      const response = await myInstance.put("/organization/approval-control/approve", {
        approvalUlids: approvalUlids,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        getApprovals();
        
      }


    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleReject = async () => {



    const approvalUlids = approvalsList.reduce<string[]>((acc, approval) => {
      if (approval.selected) {
        acc.push(approval.approval_ulid);
      }
      return acc;
    }, []);

  console.log(approvalUlids);

  if (approvalUlids.length === 0) {
    toast.info("Please select atleast one approval to reject");
    return;
  }
  setLoading(true);

  try{
    const response = await myInstance.put("/organization/approval-control/reject",{
      approvalUlids: approvalUlids
    });

    if(response.data.success){
      toast.success(response.data.message);
      getApprovals();
    }
  }
  catch(err){
    console.log(err);
  }
  setLoading(false);


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
          placeholder="Search a Cluster"
          size="sm"
          className=""
          onInputChange={searchClusters}
          selectedKey={selectedCluster}
          onSelectionChange={(key) => {
            setSelectedCluster(key as string);
            setSelectedEvent("");
          }}
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
          placeholder={`${
            !selectedCluster
              ? "Search an Event"
              : `Search a Event under selected cluster `
          }`}
          size="sm"
          className=""
          onInputChange={searchEvents}
          selectedKey={selectedEvent}
          onSelectionChange={(key) => handleEventSelection(key as string)}
        >
          {eventList.map((event) => (
            <AutocompleteItem value={event.event_name} key={event.event_ulid}>
              {event.event_name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <div className="flex items-center gap-2">
          <MyButton
            className="bg-black dark:bg-white"
            spinner={<Spinner size="sm" color="default" />}
            isLoading={loading}
            size="sm"
            startContent={<IoSearch size={20} className="text-white dark:text-black"/>}
            onClick={() => {
              getApprovals();
            }}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Search
            </span>
          </MyButton>
          <MyButton
            isLoading={loading}
            spinner={<Spinner size="sm" color="default" />}
            className="bg-black dark:bg-white"
            size="sm"
            startContent={ <IoReload size={20} className="text-white dark:text-black" />}
            onClick={() => {

              setApprovalsList([]);
              setSelectedCluster(null);
              setSelectedEvent("");
              router.refresh();
            }}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Refresh
            </span>
          </MyButton>
          <MyButton
            isLoading={loading}
            spinner={<Spinner size="sm" color="default" />}
                  className="bg-black dark:bg-white"
            size="sm"
            onClick={() => {
              handleApprove();
            }}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Approve certificates
            </span>
          </MyButton>
          <MyButton 
          isLoading={loading}
          spinner={<Spinner size="sm" color="default" />}
          className="bg-black dark:bg-white" size="sm" onClick={()=>{
            handleReject();
          }}>
            <span className="dark:text-black text-white text-md font-medium">
              reject certificates
            </span>
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default ApprovalControl;
