"use client";

import { MdPeople } from "react-icons/md";
import { MyButton } from "@/components/buttons/mybutton";
import { motion } from "framer-motion";
import { useTabContext } from "@/context/tabContext";
import { useState } from "react";
import MyModal from "@/components/modals/mymodal";
import CreateCluster from "./info/infoCards/actions/createCluster";
import { ClusterNamesIdType } from "@/types/global.types";

interface ClusterListProps {
  clusters: ClusterNamesIdType[];
}

const ClusterView: React.FC<ClusterListProps> = ({ clusters }) => {

  const { selectedTab,setSelectedTab } = useTabContext();
 const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between p-2">
        <div className="flex gap-2 mt-1">
          <MdPeople size={26} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Manage Clusters
          </h2>
        </div>
        <MyButton
          className="bg-black dark:bg-white"
          size="sm"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <span className="dark:text-black text-white text-md font-medium">
            Add
          </span>
        </MyButton>
      </div>
      <div className="flex flex-col mt-2 lg:h-full h-[200px] overflow-auto  ">
        <div className="space-y-2 p-2 mt-1 ">
          {!clusters ? (
            <div className="flex justify-center items-center">
              No clusters available.
            </div>
          ) : (
            clusters.map((cluster, index) => (
                <motion.div
                    key={cluster.id}

                    initial={{opacity: 0, y: 3}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.15, delay: index * 0.04}}
                    whileHover={{
                        scale: 1.01,
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{scale: 0.98}}
                    className={`${selectedTab.id === cluster.id ? "bg-gray-200 dark:bg-stone-700" : "bg-white dark:bg-stone-900"} rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer`}
                    onClick={() => {
                        setSelectedTab({type: "cluster", id: cluster.id});
                    }}
                >
                    <h3 className="w-full text-sm font-medium text-gray-900 dark:text-gray-100 break-words overflow-hidden">
                    {cluster.name}
                </h3>
                </motion.div>
            ))
          )}
        </div>
      </div>
        {isOpen && (
            <MyModal
                size="sm"
                isOpen={isOpen}
          backdrop="blur"
          onClose={() => {
            setIsOpen(false);
          }}
          onOpen={() => {
            setIsOpen(true);
          }}
          title="Create Cluster"
          content={<CreateCluster setIsOpen={setIsOpen}/>}
          button1={<button onClick={() => setIsOpen(false)}>Close</button>}
          button2={undefined}
        />
      )}
    </div>
  );
};

export default ClusterView;
