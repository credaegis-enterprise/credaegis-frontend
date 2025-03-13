"use client";
import { Tab, Tabs } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useTabContext } from "@/context/tabContext";
import Info from "./info/info";
import Stats from "./statistics/stats";
import { StatisticsType } from "@/types/global.types";
import InfoPage from "./blockchain/infoPage";
import Web3InfoType from "@/types/web3info.types";
import {BatchInfoType} from "@/types/batchInfo.types";
import RefreshOnNav from "@/components/funcs/RefreshOnNav";
import {MyButton} from "@/components/buttons/mybutton";
import {useRouter} from "next/navigation";
import {MdRefresh} from "react-icons/md";




interface ManageAllProps {
  batchInfo: BatchInfoType;
  web3Info: Web3InfoType;

}

const ManageAll: React.FC<ManageAllProps> = ({ batchInfo,web3Info }) => {
  const { selectedTab } = useTabContext();
  const router = useRouter();
  const [selected, setSelected] = useState<string>("Blockchain");
  const [loading, setLoading] = useState<boolean>(false);

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

              <Tab key="info" title="Info" />
              <Tab key="Blockchain" title="Blockchain" />
            </Tabs>
            <MyButton
                size="xs"
                className=" bg-black dark:bg-white mt-2 flex items-center justify-center"
                onClick={() =>

                    router.refresh()}
            >
              <MdRefresh size={20} className=" text-white dark:text-black"/>
            </MyButton>
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
                  <InfoPage batchInfo={batchInfo} web3Info={web3Info}/>
                </div>
            )}
          </div>

        </div>
      </div>
  );
};

export default ManageAll;