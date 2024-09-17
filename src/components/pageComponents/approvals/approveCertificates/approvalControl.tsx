import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";
import { MdSearch } from "react-icons/md";
import { debounce, get, set } from "lodash";
import { ApprovalsType } from "@/types/global.types";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { myInstance } from "@/utils/Axios/axios";
import exp from "constants";
import { toast } from "sonner";

interface ApproveCertificatesProps {
  setApprovalsList: (approvalsList: ApprovalsType[]) => void;
  approvalsList: ApprovalsType[];
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
}) => {

  const router = useRouter();
  const [clusterList, setClusterList] = useState<clusterType[]>([]);
  const [eventList, setEventList] = useState<eventType[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<string | null>();
  const [selectedEvent, setSelectedEvent] = useState<string | null>("");

  

  const getApprovals = async () => {
    let result;
    try {
      if (selectedEvent) {
        result = await myInstance.get(`/approvals/event/get/${selectedEvent}`);
        console.log(result);
      } else if (selectedCluster) {
        result = await myInstance.get(
          `/approvals/cluster/get/${selectedCluster}`
        );
      }
      if (result?.data.data.length === 0 && approvalsList.length === 0) {
        toast.info("No approvals found for selected filters ");
      }
      if (result) {
        const updatedResult: ApprovalsType[] = result.data.data.map(
          (approval: any) => {
            return {
              approval_ulid: approval.approval_ulid,
              approval_file_name: approval.approval_file_name,
              comments: approval.comments,
              expiry_date: approval.expiry_date,
              event_name: approval.event_name,
              issued_to_email: approval.issued_to_email,
              issued_to_name: approval.issued_to_name,
              selected: false,
            };
          }
        );

        setApprovalsList(updatedResult);
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  const debouncedSearchEvents = debounce(async (value: string, id: string) => {
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
    console.log(approvalsList);


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

    try {
      const response = await myInstance.post("/approvals/approve", {
        approval_ulids: approvalUlids,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        getApprovals();
        
      }


    } catch (err) {
      console.log(err);
    }
  };

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
            size="md"
            onClick={() => {
              getApprovals();
            }}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Search
            </span>
          </MyButton>
          <MyButton
            className="bg-black dark:bg-white"
            size="md"
            onClick={() => {

              setApprovalsList([]);
              setSelectedCluster(null);
              setSelectedEvent("");
              router.refresh();
            }}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Reset
            </span>
          </MyButton>
          <MyButton
            className="bg-green-400"
            size="md"
            onClick={() => {
              handleApprove();
            }}
          >
            <span className="text-black text-md font-medium">
              Approve certificates
            </span>
          </MyButton>
          <MyButton className="bg-red-400" size="md">
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
