'use client'
import { Tab,Tabs } from "@nextui-org/react";
import { useState,useEffect } from "react";
import { useTabContext } from "@/context/tabContext";
import { MdDashboard } from "react-icons/md";
import Info from "./info";
import { myInstance } from "@/utils/Axios/axios";



const ManageAll = () => {


    const {selectedTab} = useTabContext();
    const [selected, setSelected] = useState<string>("certificates");
    useEffect(() => {
        if(selectedTab.id)
            setSelected("info");
    }, [selectedTab])

    return (
        <div className="p-2 md:p-6 lg:p-0  h-full">
        <div className="flex flex-col lg:flex-row  gap-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
                <div className="flex gap-2">
                    <MdDashboard className="text-2xl text-gray-800 dark:text-gray-200" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Dashboard</h2>
                </div>
                <Tabs
                    selectedKey={selected}
                    onSelectionChange={(key) => setSelected(key as string)}
                    aria-label="options"
                    className="w-full lg:w-auto"
                >
                    <Tab key="certificates" title="Certificates" />
                    <Tab key="statistics" title="Statistics" />
                    <Tab key="info" title="Info" />
                </Tabs>
            </div>
        </div>
        <div className="h-80 lg:h-full overflow-auto lg:overflow-visible">
            {selected === "info" && selectedTab.id &&
              <Info cluster_ulid={selectedTab.id}/>
            }
      
        </div>
    </div>
    );
    }


export default ManageAll;