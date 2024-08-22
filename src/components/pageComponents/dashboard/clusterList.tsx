'use client';


import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import MyModal from '@/components/modals/mymodal';
import ClusterInfo from './clusterInfo';
import { useTabContext } from '@/context/tabContext';


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
}


interface ClusterListProps {
  clusters: Cluster[];
}

const ClusterList: React.FC<ClusterListProps> = ({ clusters }) => {


  const {setSelectedTab} = useTabContext() ;


  return (
    <div className="relative">
    <div className="space-y-2 p-2 mt-1">
      {clusters.map((cluster, index) => (
        <motion.div
          key={cluster.cluster_ulid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.01, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.98 }}
           className="bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer"
          onClick={() => {setSelectedTab({type:"cluster",id:cluster.cluster_ulid});}}
        >
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {cluster.cluster_name}
          </h3>
        </motion.div>
      ))}
    </div>
   
    </div>
  );
};

export default ClusterList;
