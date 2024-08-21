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
        <div>
        
            <div className="flex flex-col lg:flex-row h-full gap-6">
                <div className="flex gap-8">
                <h2 className="text-xl font-semibold mt-2 text-gray-800 dark:text-gray-200 ">Dashboard</h2>
                <Tabs
                   selectedKey={selected}
                   onSelectionChange={(key) => setSelected(key as string)} 
                  aria-label="options"
                >
                    <Tab key="certificates" title="certificates"/>
                    <Tab key={"statistics"} title="statistics"/>
                    <Tab key={"info"} title="info"/>
                </Tabs>
                </div>

                {selectedTab.id}

           </div>
        </div>
    );
    }


export default ManageAll;