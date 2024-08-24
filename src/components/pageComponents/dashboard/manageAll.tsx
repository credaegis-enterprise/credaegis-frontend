"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useTabContext } from "@/context/tabContext";
import { MdDashboard } from "react-icons/md";
import Info from "./info";
import { myInstance } from "@/utils/Axios/axios";

const ManageAll = () => {
  const { selectedTab } = useTabContext();
  const [selected, setSelected] = useState<string>("certificates");
  useEffect(() => {
    if (selectedTab.id) setSelected("info");
  }, [selectedTab]);

  return (
    <div className="flex h-full p-2 flex-col">
  <div className="flex flex-col w-full">
    <div className="flex flex-col lg:flex-row lg:gap-4">
      <div className="flex items-center mt-1">
        <MdDashboard size={26} />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 ml-2">
          Dashboard
        </h2>
      </div>

      <Tabs
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        aria-label="options"
        className="mt-2 lg:mt-0 lg:w-auto w-full"
      >
        <Tab key="certificates" title="Certificates" />
        <Tab key="statistics" title="Statistics" />
        <Tab key="info" title="Info" />
      </Tabs>
    </div>

    <div className="flex flex-col h-full overflow-hidden mt-4">
      {selected === "info" && selectedTab.id && (
        <Info cluster_ulid={selectedTab.id} />
      )}
    </div>
  </div>
</div>
  );
};

export default ManageAll;
