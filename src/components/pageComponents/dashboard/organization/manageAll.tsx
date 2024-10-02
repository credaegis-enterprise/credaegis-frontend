"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useTabContext } from "@/context/tabContext";
import Info from "./info/info"


const ManageAll = () => {

  
  const { selectedTab } = useTabContext();
  const [selected, setSelected] = useState<string>("info");


  useEffect(() => {
    if (selectedTab.id) setSelected("info");
  }, [selectedTab]);

  return (
    <div className="flex h-full p-2 ">
    <div className="flex flex-col w-full">
      <div className="flex flex-col lg:flex-row lg:gap-4">
      
  
        <Tabs
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as string)}
          aria-label="options"
          className="mt-2 lg:mt-0 lg:w-auto w-full"
        >
          {/* <Tab key="certificates" title="Certificates" /> */}
          <Tab key="statistics" title="Statistics" />
          <Tab key="info" title="Info" />
        </Tabs>
      </div>
  
      <div className="flex flex-col h-full overflow-hidden mt-4">
        {/* {selected === "info" && selectedTab.id && ( */}
        {selected === "info" && selectedTab.id ? (
          <Info clusterUlid={selectedTab.id} />
        ) : (
          <div className="flex h-full justify-center items-center text-lg   ">
            <div className="mb-20">Select a cluster to display information</div>
          </div>
        )}
        
      </div>
    </div>
  </div>
  );
};

export default ManageAll;
