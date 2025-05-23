import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";
import { MdSearch } from "react-icons/md";
import { debounce, get, set } from "lodash";
import {issuedCertificatesType } from "@/types/global.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/react";
import { IoReload } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import MyModal from "@/components/modals/mymodal";
import { MdWarning } from "react-icons/md";
import { CertificateInfoType } from "@/types/issuedCertificateInfo.types";
import { ClusterInfoType, EventInfoType } from "@/types/clusterInfo.types";

interface ApprovedCertificatesProps {
 setIssuedList: (issuedList: CertificateInfoType[]) => void;
  issuedList: CertificateInfoType[];
  selectedCluster: string | null;
  setSelectedCluster: (cluster: string | null) => void;
  selectedEvent: string | null;
  setSelectedEvent: (event: string | null) => void;
  getIssuedCertificates: () => void;
  selectedCount: number;
  setSelectedCount: (count: number) => void;
  setFilterOn: (filter: boolean) => void;
  setCurrentPage: (page: number) => void;
  
}



const ApprovedControl: React.FC<ApprovedCertificatesProps> = ({   
    issuedList,
    setIssuedList,
    selectedCluster,
    setSelectedCluster,
    selectedEvent,
    setSelectedEvent,
    selectedCount,
    setSelectedCount,
    getIssuedCertificates,
    setFilterOn,
    setCurrentPage


 
}) => {
  const router = useRouter();
  const [clusterList, setClusterList] = useState<ClusterInfoType[]>([]);
  const [eventList, setEventList] = useState<EventInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [popUp, setPopUp] = useState<boolean>(false);
  // const [selectedCluster, setSelectedCluster] = useState<string | null>();
  // const [selectedEvent, setSelectedEvent] = useState<string | null>("");

  const debouncedSearchClusters = debounce(async (value: string) => {
    try {
      const response = await myInstance.get(
        `/organization/cluster-control/cluster/search?name=${value}`
      );

      setClusterList(response.data.responseData);
    } catch (err) {
      console.log(err);
    }
  }, 300);

  const debouncedSearchEvents = debounce(async (value: string, id: string) => {
    try {
      const response = await myInstance.get(
        `/organization/event-control/event/cluster/search?name=${value}&clusterId=${id}`
      );

      setEventList(response.data.responseData);
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

  const handleRevoke = async () => {


    const issuedCertificatesUlids = issuedList.reduce<string[]>((acc, issued) => {
      if (issued.selected && !issued.revoked) {

        acc.push(issued.id);
      }
      return acc;
    }, []);

    if (issuedCertificatesUlids.length === 0) {
      toast.info("Please select atleast one certificate to revoke");
      setPopUp(false);
      return;
    }

    setLoading(true);

    try {
      const response = await myInstance.put("/organization/certificate-control/blockchain/revoke", {
        certificateIds: issuedCertificatesUlids,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        getIssuedCertificates();
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setPopUp(false);
    setCurrentPage(1);
    setSelectedCount(0);

   
  };



  return (
    <div className="flex flex-col border dark:border-stone-800 border-gray-200 mb-2 rounded-lg p-2 ">
      {popUp && (
         <MyModal
         size="md"
         isOpen={popUp}
         backdrop="blur"
         onClose={() => {
           setPopUp(false);
         }}
         onOpen={() => {
            setPopUp(true);
         }}
         title="Revoke Certificates"
         content={
          <div className="flex gap-2">
           <MdWarning size={30} className="text-yellow-500" />
            <div className="text-lg font-semibold text-yellow-500">
              Are you sure you want to revoke the selected certificates? This is an irreversible action.
              </div>
          </div>
         }
         button1={
           <MyButton
             color="danger"
             className="bg-red-500"
             size="sm"
             spinner={<Spinner size="sm" color="current" />}
             isLoading={loading}
             onClick={() => {
                handleRevoke();
             }}
           >
     
             <span className=" text-white text-md font-medium">
               Revoke Certificates
             </span>
           </MyButton>
         }
         button2={undefined}
       />
      )}
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
              value={cluster.name}
              key={cluster.id}
            >
              {cluster.name}
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
            <AutocompleteItem value={event.name} key={event.id}>
              {event.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <div className="flex items-center gap-2">
          <MyButton
            isLoading={loading}
            startContent={<IoSearch size={20} className="text-white dark:text-black" />}
            spinner={<Spinner color="default" size="md"/>}
            className="bg-black dark:bg-white"
            size="sm"
            onClick={() => {
                getIssuedCertificates();
            }}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Search
            </span>
          </MyButton>
          <MyButton
          startContent={<IoReload size={20} className="text-white dark:text-black" />}
            className="bg-black dark:bg-white"
            size="sm"
            onClick={() => {
            
              setCurrentPage(1);
              setIssuedList([])
              setSelectedCluster(null);
              setSelectedCount(0);
              setSelectedEvent(null);
              setFilterOn(false);
              router.refresh();
            }}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Refresh
            </span>
          </MyButton>
          <MyButton
          isLoading={loading}
          isDisabled={selectedCount < 1}
          spinner={<Spinner color="default" size="md"/>}
          className={`bg-black dark:bg-white ${selectedCount < 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          size="sm"
            onClick={() => {
              console.log("selectedCount", selectedCount);
              if(selectedCount === 0){
                toast.info("Please select at least one certificate to revoke");
      
              }
              else
              setPopUp(true);
            }}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Revoke Certificates
            </span>
          </MyButton>
         
        </div>
      </div>
    </div>
  );
};

export default ApprovedControl;
