import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";
import { MdSearch,MdWarning } from "react-icons/md";
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
import { CertificateInfoType } from "@/types/issuedCertificateInfo.types";
import { EventSearchInfoType } from "@/types/event.types";

interface ApprovedCertificatesProps {
 setIssuedList: (issuedList: CertificateInfoType[]) => void;
  issuedList: CertificateInfoType[];
  selectedEvent: string | null;
  setSelectedEvent: (event: string | null) => void;
  getIssuedCertificates: () => void;
  setFilterOn: (filter: boolean) => void;
  setCurrentPage: (page: number) => void;
  
}





const ApprovedControl: React.FC<ApprovedCertificatesProps> = ({   
    issuedList,
    setIssuedList,
    selectedEvent,
    setSelectedEvent,
    getIssuedCertificates,
    setCurrentPage,
    setFilterOn


 
}) => {
  const router = useRouter();

  const [eventList, setEventList] = useState<EventSearchInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [popUp, setPopUp] = useState<boolean>(false);
 

  

  const debouncedSearchEvents = debounce(async (value: string) => {
    try {
      const response = await myInstance.get(
        `/member/event-control/event/name/search?name=${value}`
      );

      setEventList(response.data.responseData);
    } catch (err) {
      console.log(err);
    }
  }, 300);

 

  const searchEvents = async (value: string) => {
  
    debouncedSearchEvents(value);
  };

  const handleEventSelection = (key: string) => {
  
    setSelectedEvent(key);
  };

  const handleRevoke = async () => {

  
    const issuedCertificatesUlids = issuedList.reduce<string[]>((acc, issued) => {
        console.log(issued.revoked)
      if (issued.selected && !issued.revoked) {
        console.log(issued.revoked)
        acc.push(issued.id);
      }
      return acc;
    }, []);

    if (issuedCertificatesUlids.length === 0) {
      toast.info("Please select atleast one certificate to revoke");
      return;
    }

    setLoading(true);

    try {
      const response = await myInstance.put("/member/certificate-control/revoke", {
        certificateIds: issuedCertificatesUlids,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        getIssuedCertificates();
      }
    } catch (err) {
      console.log(err);
    }

    setPopUp(false);
    setLoading(false);
    setCurrentPage(1);




   
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
              Are you sure you want to revoke the selected certificates?, this is an irrriversible action.
              </div>
          </div>
         }
         button1={
           <MyButton
             color="danger"
             
             size="sm"
             spinner={<Spinner size="sm" color="default" />}
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
      <div className="flex flex-col lg:flex-row  gap-4 p-2 w-3/4">
        
        <Autocomplete
          label=" Event"
          placeholder={`Search for event`}
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
              setIssuedList([])
              setSelectedEvent("");
              setFilterOn(false);
              setCurrentPage(1);
              router.refresh();
            }}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Reset
            </span>
          </MyButton>
          <MyButton
          isLoading={loading}
          spinner={<Spinner color="default" size="md"/>}
            className="bg-black dark:bg-white"
            size="sm"
            onClick={() => {
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
