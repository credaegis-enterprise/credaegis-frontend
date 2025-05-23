import { MyButton } from "@/components/buttons/mybutton";
import { Checkbox } from "@nextui-org/react";
import ApprovalControl from "./actions/approvalControl";
import { useState } from "react";
import { ApprovalsType } from "@/types/global.types";
import { useEffect,useCallback } from "react";
import ApprovalViewer from "./actions/approvalViewer";
import ApprovalModify from "./actions/approvalModify";
import MyModal from "@/components/modals/mymodal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MdEvent } from "react-icons/md";
import { MdComment } from "react-icons/md";
import { myInstance } from "@/utils/Axios/axios";
import { MdAccountCircle } from "react-icons/md";
import { GrBookmark } from "react-icons/gr";
import { RiGroup2Fill } from "react-icons/ri";
import { Spinner } from "@nextui-org/react";
import { ApprovalInfoType } from "@/types/approvalInfo.type";



interface ApproveCertificatesProps {
    approvalsInfo: ApprovalInfoType[];
    }

const ApproveCertificates: React.FC<ApproveCertificatesProps> = ({approvalsInfo}) => {

  console.log(approvalsInfo);

  const router = useRouter();
  const [approvalsList, setApprovalsList] = useState<ApprovalInfoType[]>([]);
  const [selectedApproval, setSelectedApproval] = useState<ApprovalInfoType>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModifyOpen, setIsModifyOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>("");
  const [loading, setLoading] = useState(false);



  useEffect(() => { 
    console.log(approvalsInfo);
    setApprovalsList(approvalsInfo);
  }, [approvalsInfo]);



  const getApprovals = useCallback(async () => {
      setLoading(true);
    let result;
    try {
      if (selectedEvent) {
        result = await myInstance.get(`/member/approval-control/event/get-all/${selectedEvent}`);
        console.log(result);
      } 
      else{
        router.refresh();
      }
    
      if (result?.data.responseData.length === 0 || approvalsList.length === 0) {
        toast.info("No approvals found for selected filters ");
      }
      if (result) {
       

        setApprovalsList(result.data.responseData);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);

  } , [ selectedEvent, router, approvalsList]);



  const handleSelectAll = () => {
    const newApprovalsList = [...approvalsList];
    newApprovalsList.forEach(approval => {
      approval.selected = true;
    });
    setApprovalsList(newApprovalsList);
  }

  const handleSelectOne = (index:number) => {
    const newApprovalsList = [...approvalsList];
    newApprovalsList[index].selected = !newApprovalsList[index].selected;
    setApprovalsList(newApprovalsList);
  }

  const handleDeselectAll = () => {
    const newApprovalsList = [...approvalsList];
    newApprovalsList.forEach(approval => {
      approval.selected = false;
    });
    setApprovalsList(newApprovalsList);
  }

  console.log(approvalsList);
  
  return (
    <div className="h-full flex flex-col">
     <ApprovalControl  setApprovalsList={setApprovalsList} approvalsList={approvalsList} 
     setSelectedEvent={setSelectedEvent} selectedEvent={selectedEvent} 
     getApprovals={getApprovals} />
     {!loading ? (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border dark:border-neutral-800">
      <table className="w-full text-sm text-left">
        <thead className="text-md bg-neutral-100 dark:bg-neutral-800 rounded-t-lg sticky z-30 top-0">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              <div className="flex items-center gap-1">
                <GrBookmark size={20} />
                <span>Event Name</span>
              </div>
         
            </th>
           
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              <div className="flex items-center gap-1">
                <MdAccountCircle size={20} /> 
                <span>Issued To</span>
              </div>
            </th>

            {/* <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              <div className="flex items-center gap-1">   
                <IoCloudUpload size={20} />
                <span>Uploaded By</span>  
              </div>
            </th> */}
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              <div className="flex items-center gap-1">
                <MdEvent size={20} />
                <span>Expiry Date</span>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              <div className="flex items-center gap-1">
                <MdComment size={20} />
                <span>Comments</span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-center">
                <div className="flex justify-center gap-3">
                    <MyButton size="sm" className="bg-black dark:bg-white" onClick={()=>{
                        handleSelectAll();
                    }}>
                        <span className="dark:text-black text-white text-md font-medium">
                            Select All
                        </span>
                    </MyButton>
                    <MyButton size="sm" className="bg-black dark:bg-white" onClick={()=>{
                        handleDeselectAll();
                    }}>
                        <span className="dark:text-black text-white text-md font-medium">
                          Deselect All
                        </span>
                    </MyButton>
                    </div>
            </th>
          </tr>
        </thead>
        {approvalsList && approvalsList.length > 0 ? (
        <tbody className="">
            {approvalsList.map((approval, index) => (
            <tr key={index} className="">
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                {approval.eventName}
              </td>
              
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                <div className="flex flex-col gap-2">
                    <span>{approval.recipientName}</span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">{approval.recipientEmail}</span>
                </div>

              </td>
              {/* <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
               {approval.issued_to_email}
              </td> */}
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
             {approval.expiryDate? new Date(approval.expiryDate).toLocaleDateString(): "N/A"}
              </td>
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
             {approval.comment? approval.comment : "N/A"}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-4">
                <MyButton size="sm" className="bg-black dark:bg-white" onClick={()=>{
                    setSelectedApproval(approval);
                    setIsOpen(true);
                }
                  
                }>
                    <span className="dark:text-black text-white text-md font-medium">
                        View
                    </span>
                </MyButton>
                <MyButton size="sm" className="bg-black dark:bg-white"
                onClick={()=>{

                    setSelectedApproval(approval);
                    setIsModifyOpen(true);
                }}>
                    <span className="dark:text-black text-white text-md font-medium">
                        Modify
                    </span>
                </MyButton>
                <Checkbox  isSelected={approval.selected} onValueChange={() => handleSelectOne(index)} className="form-checkbox text-neutral-600 dark:text-neutral-300" color="success" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        ):(
            <tbody>
                <tr>
                <td colSpan={6}  className="text-center text-md py-4 text-neutral-900 dark:text-neutral-100">
                    No certificates to approve
                </td>
                </tr>
            </tbody>
        )}
      </table>
    </div>
     ):(
         <div className="flex justify-center items-center h-full">
             <Spinner size="lg" color="current" className="dark:text-white text-black" />
         </div>
     )}
   
    {isOpen && selectedApproval && <ApprovalViewer approvalId={selectedApproval.id} approvalFileName={selectedApproval.approvalCertificateName} setIsOpen={setIsOpen} isOpen={isOpen} />}
    
    {isModifyOpen && selectedApproval && 
    <MyModal
      size="xl"
      isOpen={isModifyOpen}
      backdrop="blur"
      onOpen={() => setIsModifyOpen(true)} 
      onClose={() => setIsModifyOpen(false)}
      title="Modify Approval"
      content={<ApprovalModify approval={selectedApproval} setIsModifyOpen={setIsModifyOpen} getApprovals={getApprovals} />}
      button1={undefined}
      button2={undefined}
    />}
   
    </div>
  );
};

export default ApproveCertificates;
