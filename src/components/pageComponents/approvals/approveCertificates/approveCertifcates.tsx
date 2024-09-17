import { MyButton } from "@/components/buttons/mybutton";
import { Checkbox } from "@nextui-org/react";
import ApprovalControl from "./approvalControl";
import { useState } from "react";
import { ApprovalsType } from "@/types/global.types";
import { useEffect,useCallback } from "react";
import ApprovalViewer from "./approvalViewer";
import ApprovalModify from "./approvalModify";
import MyModal from "@/components/modals/mymodal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { myInstance } from "@/utils/Axios/axios";


interface ApproveCertificatesProps {
    approvalsInfo: ApprovalsType[];
    }

const ApproveCertificates: React.FC<ApproveCertificatesProps> = ({approvalsInfo}) => {

  const router = useRouter();
  const [approvalsList, setApprovalsList] = useState<ApprovalsType[]>([]);
  const [selectedApproval, setSelectedApproval] = useState<ApprovalsType>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModifyOpen, setIsModifyOpen] = useState<boolean>(false);
  const [selectedCluster, setSelectedCluster] = useState<string | null>(""); 
  const [selectedEvent, setSelectedEvent] = useState<string | null>("");



  useEffect(() => { 
    console.log(approvalsInfo);
    setApprovalsList(approvalsInfo);
  }, [approvalsInfo]);



  const getApprovals = useCallback(async () => {
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
      else{
        router.refresh();
      }
      if (result?.data.data.length === 0 && approvalsList.length === 0) {
        toast.info("No approvals found for selected filters ");
      }
      if (result) {
        const updatedResult: ApprovalsType[] = result.data.data.map(
          (approval: any) => {
            return {
              approval_ulid: approval.approval_ulid,
              approval_file_ulid: approval.approval_file_ulid,
              approval_file_name: approval.approval_file_name,
              comments: approval.comments,
              expiry_date: approval.expiry_date,
              event_name: approval.event_name,
              issued_to_email: approval.issued_to_email,
              issued_to_name: approval.issued_to_name,
              event_ulid: approval.event_ulid,
              cluster_ulid: approval.cluster_ulid,
              selected: false,
            };
          }
        );

        setApprovalsList(updatedResult);
      }
    } catch (err) {
      console.log(err);
    }

  } , [selectedCluster, selectedEvent, router, approvalsList]);



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
     <ApprovalControl  setApprovalsList={setApprovalsList} approvalsList={approvalsList} setSelectedCluster={setSelectedCluster}
     setSelectedEvent={setSelectedEvent} selectedEvent={selectedEvent} selectedCluster={selectedCluster}
     getApprovals={getApprovals} />
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border dark:border-neutral-800">
      <table className="w-full text-sm text-left">
        <thead className="text-md bg-neutral-100 dark:bg-neutral-800 rounded-t-lg sticky z-30 top-0">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              Event Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              Issued To
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              Uploaded By
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              Expiry
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              Comments
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
                          deselect All
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
                {approval.event_name}
              </td>
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                <div className="flex flex-col gap-2">
                    <span>{approval.issued_to_name}</span>
                    <span>{approval.issued_to_email}</span>
                </div>

              </td>
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
               {approval.issued_to_email}
              </td>
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
             {approval.expiry_date? approval.expiry_date : "N/A"}
              </td>
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
             {approval.comments? approval.comments : "N/A"}
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
   
    {isOpen && selectedApproval && <ApprovalViewer cluster_ulid={selectedApproval.cluster_ulid} event_ulid={selectedApproval.event_ulid} approval_file_name={selectedApproval.approval_file_name} approval_file_ulid={selectedApproval.approval_file_ulid} setIsOpen={setIsOpen} isOpen={isOpen} />}
    
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
