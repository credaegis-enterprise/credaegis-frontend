import { MyButton } from "@/components/buttons/mybutton";
import { Checkbox } from "@nextui-org/react";
import ApprovalControl from "./actions/approvalControl";
import { useState } from "react";
import { ApprovalsType } from "@/types/global.types";
import { useEffect, useCallback } from "react";
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
import { set } from "lodash";

interface ApproveCertificatesProps {
  approvalsInfo: ApprovalsType[];
}

const ApproveCertificates: React.FC<ApproveCertificatesProps> = ({
  approvalsInfo,
}) => {
  const router = useRouter();
  const [approvalsList, setApprovalsList] = useState<ApprovalsType[]>([]);
  const [selectedApproval, setSelectedApproval] = useState<ApprovalsType>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModifyOpen, setIsModifyOpen] = useState<boolean>(false);
  const [selectedCluster, setSelectedCluster] = useState<string | null>("");
  const [selectedEvent, setSelectedEvent] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const [mainLoading, setMainLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log(approvalsInfo);
    setApprovalsList(approvalsInfo);
  }, [approvalsInfo]);

  const getApprovals = useCallback(async () => {
    setLoading(true);
    let result;
    try {
      if (selectedEvent) {
        result = await myInstance.get(
          `/organization/approval-control/event/get-all/${selectedEvent}`
        );
        console.log(result);
      } else if (selectedCluster) {
        result = await myInstance.get(
          `/organization/approval-control/cluster/get-all/${selectedCluster}`
        );
      } else {
        router.refresh();
      }
      console.log(result);
      if (result?.data.data.length === 0 || approvalsList.length === 0) {
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
              cluster_name: approval.cluster_name,
              selected: false,
            };
          }
        );

        setApprovalsList(updatedResult);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [selectedCluster, selectedEvent, router, approvalsList]);

  const handleSelectAll = () => {
    setCount(approvalsList.length);
    const newApprovalsList = [...approvalsList];
    newApprovalsList.forEach((approval) => {
      approval.selected = true;
    });
    setApprovalsList(newApprovalsList);
  };

  const handleSelectOne = (index: number) => {
    const newApprovalsList = [...approvalsList];
    newApprovalsList[index].selected = !newApprovalsList[index].selected;
    setApprovalsList(newApprovalsList);
    if (newApprovalsList[index].selected) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
  };

  const handleDeselectAll = () => {
    setCount(0);
    const newApprovalsList = [...approvalsList];
    newApprovalsList.forEach((approval) => {
      approval.selected = false;
    });
    setApprovalsList(newApprovalsList);
  };

  console.log(approvalsList);

  return (
    <div className="h-full flex flex-col">
      {/* {mainLoading&& (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-200 dark:bg-stone-800 p-6 rounded-lg shadow-lg flex items-center space-x-4">
           <Spinner size="lg" color="current" className="text-black dark:text-white" />
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Please wait, your request is being processed.
            </div>
          </div>
        </div>
      )} */}
      <ApprovalControl
        setApprovalsList={setApprovalsList}
        approvalsList={approvalsList}
        setSelectedCluster={setSelectedCluster}
        setSelectedEvent={setSelectedEvent}
        selectedEvent={selectedEvent}
        selectedCluster={selectedCluster}
        getApprovals={getApprovals}
        count={count}
        setMainLoading={setMainLoading}
      />
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
                    <RiGroup2Fill size={20} />
                    <span>Cluster Name</span>
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
                    <MyButton
                      size="sm"
                      className="bg-black dark:bg-white"
                      onClick={() => {
                        handleSelectAll();
                      }}
                    >
                      <span className="dark:text-black text-white text-md font-medium">
                        Select All
                      </span>
                    </MyButton>
                    <MyButton
                      size="sm"
                      className="bg-black dark:bg-white"
                      onClick={() => {
                        handleDeselectAll();
                      }}
                    >
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
                      {approval.cluster_name}
                    </td>
                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                      <div className="flex flex-col gap-2">
                        <span>{approval.issued_to_name}</span>
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {approval.issued_to_email}
                        </span>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
               {approval.issued_to_email}
              </td> */}
                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                      {approval.expiry_date ? approval.expiry_date : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                      {approval.comments ? approval.comments : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-4">
                        <MyButton
                          size="sm"
                          className="bg-black dark:bg-white"
                          onClick={() => {
                            setSelectedApproval(approval);
                            setIsOpen(true);
                          }}
                        >
                          <span className="dark:text-black text-white text-md font-medium">
                            View
                          </span>
                        </MyButton>
                        <MyButton
                          size="sm"
                          className="bg-black dark:bg-white"
                          onClick={() => {
                            setSelectedApproval(approval);
                            setIsModifyOpen(true);
                          }}
                        >
                          <span className="dark:text-black text-white text-md font-medium">
                            Modify
                          </span>
                        </MyButton>
                        <Checkbox
                          isSelected={approval.selected}
                          onValueChange={() => handleSelectOne(index)}
                          className="form-checkbox text-neutral-600 dark:text-neutral-300"
                          color="success"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-md py-4 text-neutral-900 dark:text-neutral-100"
                  >
                    No certificates to approve
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <Spinner
            size="lg"
            color="current"
            className="dark:text-white text-black"
          />
        </div>
      )}

      {isOpen && selectedApproval && (
        <ApprovalViewer
          cluster_ulid={selectedApproval.cluster_ulid}
          event_ulid={selectedApproval.event_ulid}
          approval_file_name={selectedApproval.approval_file_name}
          approval_file_ulid={selectedApproval.approval_file_ulid}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      )}

      {isModifyOpen && selectedApproval && (
        <MyModal
          size="xl"
          isOpen={isModifyOpen}
          backdrop="blur"
          onOpen={() => setIsModifyOpen(true)}
          onClose={() => setIsModifyOpen(false)}
          title="Modify Approval"
          content={
            <ApprovalModify
              approval={selectedApproval}
              setIsModifyOpen={setIsModifyOpen}
              getApprovals={getApprovals}
            />
          }
          button1={undefined}
          button2={undefined}
        />
      )}
    </div>
  );
};

export default ApproveCertificates;
