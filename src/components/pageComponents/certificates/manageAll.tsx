"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import UploadCertificates from "./uploadCertificates";

const ManageAll = () => {
  const [selected, setSelected] = useState<string>("upload certificate");

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col lg:flex-row lg:gap-4">
        <Tabs
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as string)}
          aria-label="options"
          className="mt-2 lg:mt-0 lg:w-auto w-full"
        >
          <Tab key="upload certificates" title="Upload Certificates" />
          <Tab key="statistics" title="Statistics" />
          <Tab key="info" title="Info" />
        </Tabs>
      </div>

   
      <div className="flex-grow flex flex-col lg:flex-row  mt-4">
        <div className="flex-grow p-4">
          {selected === "upload certificates" && <UploadCertificates />}
         </div>
      </div>
    </div>
  );
};

export default ManageAll;
