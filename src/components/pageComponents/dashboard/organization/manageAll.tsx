"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useTabContext } from "@/context/tabContext";
import Info from "./info/info";
import Stats from "./statistics/stats";
import { StatisticsType } from "@/types/global.types";


interface ManageAllProps {
  stats: StatisticsType;
}

const ManageAll: React.FC<ManageAllProps> = ({ stats }) => {
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
            {/* <Tab key="statistics" title="Statistics" /> */}
            <Tab key="info" title="Info" />
          </Tabs>
        </div>

        <div className="flex flex-col h-full overflow-hidden mt-4">
          {selected === "info" ? (
            selectedTab.id ? (
              <Info clusterId={selectedTab.id} />
            ) : (
              <div className="flex flex-col h-full justify-center items-center">
                <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Select a cluster to view info
                </div>
               
              </div>
            )
          ) : (
            <div className="flex flex-col h-full overflow-hidden mt-4">
              {/* <Stats stats={stats} /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAll;
