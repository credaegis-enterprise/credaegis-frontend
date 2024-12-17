"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import ApproveCertificates from "./approveCertificates/approveCertifcates";
import ApprovedCertificates from "./approvedCertificates/approvedCertificates";
import { ApprovalInfoType } from "@/types/approvalInfo.type";
import { CertificateInfoType } from "@/types/issuedCertificateInfo.types";


interface ManageAllProps {
    approvalsInfo: ApprovalInfoType[];
       issuedInfo: CertificateInfoType[]
       issuedCount: number;
}


const ManageAll: React.FC<ManageAllProps> = ({approvalsInfo,issuedInfo,issuedCount}) => {
  const [selected, setSelected] = useState<string>("Approval requests");

    console.log(approvalsInfo);
    console.log(issuedInfo);
  return (
    <div className="h-full flex p-2 ">
      <div className="flex flex-col w-full">
      <div className="flex flex-col lg:flex-row lg:gap-4">
        <Tabs
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as string)}
          aria-label="options"
          className="mt-2 lg:mt-0 lg:w-auto w-full"
        >
          <Tab key="Approval requests" title="Approval requests" />
          <Tab key="Approval history" title="Approval History" />

        </Tabs>
      </div>

   
      <div className="flex flex-col h-full overflow-hidden mt-4 ">
          {selected === "Approval requests" && <ApproveCertificates approvalsInfo={approvalsInfo} />}
            {selected === "Approval history" && <ApprovedCertificates issuedInfo={issuedInfo} issuedCount={issuedCount}  />}

      </div>
    </div>
  </div>
  );
};

export default ManageAll;