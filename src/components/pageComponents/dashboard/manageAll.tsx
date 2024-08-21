'use client'
import { Tab,Tabs } from "@nextui-org/react";
import { useState,useEffect } from "react";
import { useTabContext } from "@/context/tabContext";



const ManageAll = () => {


    const {selectedTab} = useTabContext();
    const [selected, setSelected] = useState<string>("certificates");
    useEffect(() => {
        if(selectedTab.id)
            setSelected("info");
    }, [selectedTab])

    return (
        <div className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row h-full gap-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Dashboard</h2>
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
            <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-300">Selected Tab ID: {selectedTab.id}</p>
            </div>
        </div>
    </div>
    );
    }


export default ManageAll;