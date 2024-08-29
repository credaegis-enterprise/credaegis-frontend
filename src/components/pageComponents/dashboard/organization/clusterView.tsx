"use client";

import { MdPeople } from "react-icons/md";
import { MyButton } from "@/components/buttons/mybutton";
import { motion } from "framer-motion";
import { useTabContext } from "@/context/tabContext";
import { useState } from "react";
import MyModal from "@/components/modals/mymodal";
import CreateCluster from "./createCluster";

type Cluster = {
  cluster_ulid: string;
  cluster_name: string;
  organization_ulid: string;
  created_at: string;
  deactivated: number;
  updated_at: string;
  member_ulid: string;
  deleted: number;
  member_email: string;
  member_password: string;
  member_name: string;
};

interface ClusterListProps {
  clusters: Cluster[];
}

const ClusterView: React.FC<ClusterListProps> = ({ clusters }) => {

  const { setSelectedTab } = useTabContext();
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
                key={cluster.cluster_ulid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer"
                onClick={() => {
                  setSelectedTab({ type: "cluster", id: cluster.cluster_ulid });
                }}
              >
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {cluster.cluster_name}
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
