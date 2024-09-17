import { MyButton } from "@/components/buttons/mybutton";
import { Checkbox } from "@nextui-org/react";
import ApprovalControl from "./approvalControl";
import { EventType,ClusterType } from "@/types/global.types";
import { use, useState } from "react";
import { ApprovalsType } from "@/types/global.types";
import { useEffect } from "react";



interface ApproveCertificatesProps {

    }

const ApprovedCertificates: React.FC<ApproveCertificatesProps> = () => {


    const approvalsList: ApprovalsType[] = [
  
       
    ]


  


  
  return (
    <div className="h-full flex flex-col">
   
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
                       
                    }}>
                        <span className="dark:text-black text-white text-md font-medium">
                            Select All
                        </span>
                    </MyButton>
                    <MyButton size="sm" className="bg-black dark:bg-white" onClick={()=>{
                       
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
                <MyButton size="sm" className="bg-black dark:bg-white">
                    <span className="dark:text-black text-white text-md font-medium">
                        View
                    </span>
                </MyButton>
                <Checkbox  isSelected={approval.selected} onValueChange={() => {}} className="form-checkbox text-neutral-600 dark:text-neutral-300" color="success" />
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
    </div>
  );
};

export default ApprovedCertificates;
