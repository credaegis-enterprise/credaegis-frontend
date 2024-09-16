"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import UploadCertificates from "./uploadCertificates/uploadCertificates";
import ApproveCertificates from "./approveCertificates/approveCertifcates";
import { Event } from "@/types/global.types";

interface ManageAllProps {
  eventInfo: Event[];
}


const ManageAll: React.FC<ManageAllProps> = ({ eventInfo }) => {
  const [selected, setSelected] = useState<string>("upload certificate");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);


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
          <Tab key="upload certificates" title="Upload Certificates" />
          <Tab key="approvals" title="approvals" />

        </Tabs>
      </div>

   
      <div className="flex flex-col h-full overflow-hidden mt-4 ">
          {selected === "upload certificates" && <UploadCertificates eventInfo={eventInfo} />}
          {selected === "approvals" && 
          
          <ApproveCertificates/>
          }
      </div>
    </div>
  </div>
  );
};

export default ManageAll;
