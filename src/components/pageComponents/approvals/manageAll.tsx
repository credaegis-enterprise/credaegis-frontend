"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import ApproveCertificates from "./approveCertificates/approveCertifcates";


interface ManageAllProps {
}


const ManageAll: React.FC<ManageAllProps> = () => {
  const [selected, setSelected] = useState<string>("Approval requests");


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
          {selected === "Approval requests" && <ApproveCertificates />}
      </div>
    </div>
  </div>
  );
};

export default ManageAll;