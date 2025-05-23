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
import MyModal from "@/components/modals/mymodal";
import { MdWarning } from "react-icons/md";
import { count } from "console";
import { ApprovalInfoType } from "@/types/approvalInfo.type";
import { ClusterSearchInfoType } from "@/types/clusterInfo.types";
import { Checkbox } from "@nextui-org/react";
import { EventSearchInfoType } from "@/types/event.types";

interface ApproveCertificatesProps {
  setApprovalsList: (approvalsList: ApprovalInfoType[]) => void;
  approvalsList: ApprovalInfoType[];
  selectedCluster: string | null;
  setSelectedCluster: (cluster: string | null) => void;
  selectedEvent: string | null;
  setSelectedEvent: (event: string | null) => void;
  getApprovals: () => void;
  setMainLoading: (mainLoading:boolean) => void;
  count: number;
}

const ApprovalControl: React.FC<ApproveCertificatesProps> = ({
  setApprovalsList,
  approvalsList,
  selectedCluster,
  setSelectedCluster,
  selectedEvent,
  setMainLoading,
  setSelectedEvent,
  getApprovals,
  count,
}) => {
  const router = useRouter();
  const [clusterList, setClusterList] = useState<ClusterSearchInfoType[]>([]);
  const [eventList, setEventList] = useState<EventSearchInfoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [persistance, setPersistance] = useState(false);
  // const [selectedCluster, setSelectedCluster] = useState<string | null>();
  // const [selectedEvent, setSelectedEvent] = useState<string | null>("");

  const debouncedSearchClusters = debounce(async (value: string) => {
    try {
      const response = await myInstance.get(
        `/organization/cluster-control/cluster/search?name=${value}`
      );

      setClusterList(response.data.responseData||[]);
    } catch (err) {
      console.log(err);
    }
  }, 300);

  const debouncedSearchEvents = debounce(async (value: string, id: string) => {
    try {
      const response = await myInstance.get(
        `/organization/event-control/event/cluster/search?name=${value}&clusterId=${id}`
      );

      setEventList(response.data.responseData||[]);
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
    setSelectedEvent(key);
  };



  const getSelectedApprovalUlids = () => {
    return approvalsList.reduce<string[]>((acc, approval) => {
        if (approval.selected) {
            acc.push(approval.id);
        }
        return acc;
    }
    , []);
  }
  const handleApprove = async () => {
    setMainLoading(true);
    const approvalUlids = getSelectedApprovalUlids();

    if (approvalUlids.length === 0) {
      toast.info("Please select at least one approval to approve");
      return;
    }

    setLoading(true);


    //on chain approval- for off chain approval, we need to call another api without /blockchain
    try {
      const response = await myInstance.post(
        `/organization/approval-control/blockchain/approve?persist=${persistance}`,
        {
          approvalCertificateIds: approvalUlids,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getApprovals();
      }
    } catch (err) {
      console.log(err);
    }
    setApproveModal(false);
    setLoading(false);
    setMainLoading(false);
  };

  const handleReject = async () => {
    setMainLoading(true);
    const approvalUlids = getSelectedApprovalUlids();


    if (approvalUlids.length === 0) {
      toast.info("Please select at least one approval to reject");
      return;
    }
    setLoading(true);

    try {
      const response = await myInstance.put(
        "/organization/approval-control/reject",
        {
          approvalCertificateIds: approvalUlids,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getApprovals();
      }
    } catch (err) {
      console.log(err);
    }
    setRejectModal(false);
    setLoading(false);
    setMainLoading(false);
  };


  console.log("persistance")
  console.log(persistance)

  return (
    <div className="flex flex-col border dark:border-stone-800 border-gray-200 mb-2 rounded-lg p-2 ">
      {rejectModal && (
        <MyModal
          size="md"
          isOpen={rejectModal}
          backdrop="blur"
          onClose={() => {
            setRejectModal(false);
          
          }}
          onOpen={() => {
            setRejectModal(true);
          }}
          title="Reject Certificates"
          content={
            <div className="flex gap-2">
              <MdWarning size={30} className="text-yellow-500" />
              <div className="text-lg font-semibold text-yellow-500">
                Are you sure you want to reject the selected certificates? These certificates will be displayed as rejected by this user and file data will be deleted.
              </div>
            </div>
          }
          button1={
            <MyButton
              color="danger"
              size="sm"
              spinner={<Spinner size="sm" color="current" />}
              isLoading={loading}
              onClick={() => {
                handleReject();
              }}
            >
              <span className=" text-white text-md font-medium">
                Reject Certificates
              </span>
            </MyButton>
          }
          button2={undefined}
        />
      )}
      {approveModal && (
        <MyModal
          size="md"
          isOpen={approveModal}
          backdrop="blur"
          onClose={() => {
            setApproveModal(false);
            setPersistance(false);
          }}
          onOpen={() => {
            setApproveModal(true);
          }}
          title="Approve Certificates"
          content={
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
              <MdWarning size={60} className="text-red-500" />
              <div className="text-lg font-semibold text-red-500">
                Are you sure you want to approve the selected certificates? These certificates
                will be displayed as issued by this user.
              </div>
              </div>
              <div className="flex items-center gap-2">
              <Checkbox
                            isSelected={persistance}
                            onValueChange={() => {
                              setPersistance(!persistance);
                            }}
                            className="form-checkbox text-neutral-600 dark:text-neutral-300"
                            color="success"
                          />
      
                
                <div className="text-lg font-semibold text-yellow-500">
                Do you want to persist the file storage of these certificates to be approved? Otherwise it will be deleted.
                </div>
                </div>
            </div>
          }
          button1={
            <MyButton
              className="bg-green-400"
              size="sm"
              spinner={<Spinner size="sm" color="current" />}
              isLoading={loading}
              onClick={() => {
                handleApprove();
              }}
            >
              <span className=" text-black text-md font-medium">
                Approve Certificates
              </span>
            </MyButton>
          }
          button2={undefined}
        />
      )}
      <div className="flex text-lg font-medium ml-2">
        <MdSearch size={26} />
        <div>Search and filter</div>
      </div>
      <div className="flex flex-col lg:flex-row  gap-4 p-2">
        <Autocomplete
          label=" Cluster"
          placeholder="Search for a cluster"
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
              value={cluster.name.toString()}
              key={cluster.id.toString()}
            >
              {cluster.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          label=" Event"
          placeholder={`${
            !selectedCluster
              ? "Search for an event"
              : `Search for an event under the selected cluster `
          }`}
          size="sm"
          className=""
          onInputChange={searchEvents}
          selectedKey={selectedEvent}
          onSelectionChange={(key) => handleEventSelection(key as string)}
        >
          {eventList.map((event) => (
            <AutocompleteItem value={event.name} key={event.id}>
              {event.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <div className="flex items-center gap-2">
          <MyButton
            className="bg-black dark:bg-white"
            spinner={<Spinner size="sm" color="default" />}
            isLoading={loading}
            size="sm"
            startContent={
              <IoSearch size={20} className="text-white dark:text-black" />
            }
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
            startContent={
              <IoReload size={20} className="text-white dark:text-black" />
            }
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
            className={`bg-black dark:bg-white ${getSelectedApprovalUlids().length < 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            isDisabled={getSelectedApprovalUlids().length < 1}
            size="sm"
            onClick={() => {
              if(count === 0){
                toast.info("Please select at least one approval to approve");
              }
              else{
              setApproveModal(true);
              }
            }}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Approve Certificates
            </span>
          </MyButton>
          <MyButton
            isLoading={loading}
            spinner={<Spinner size="sm" color="default" />}
            className={`bg-black dark:bg-white ${getSelectedApprovalUlids().length < 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            isDisabled={getSelectedApprovalUlids().length < 1}
            size="sm"
            onClick={() => {
              if(count === 0){
                toast.info("Please select at least one approval to reject");
              }
              else{
              setRejectModal(true);
              }
            }}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Reject Certificates
            </span>
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default ApprovalControl;
