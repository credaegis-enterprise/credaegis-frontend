'use client';


import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import MyModal from '@/components/modals/mymodal';

type Cluster = {
  cluster_name: string;
  cluster_ulid: string;
  created_at: string;
  deactivated: boolean;
  organization_ulid: string;
  updated_at: string;
};

interface ClusterListProps {
  clusters: Cluster[];
}

const ClusterList: React.FC<ClusterListProps> = ({ clusters }) => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
    <div className="space-y-2">
      {clusters.map((cluster, index) => (
        <motion.div
          key={cluster.cluster_ulid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-300"
          onClick={() => setIsOpen(true)}
        >
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {cluster.cluster_name}
          </h3>
        </motion.div>
      ))}
    </div>
    <MyModal
      size="md"
      isOpen={isOpen}
      backdrop="blur"
      onClose={() => {
        setIsOpen(false);
      }}
      onOpen={() => {
        setIsOpen(true);
      }}
      title="Cluster Details"
      content={<div>Cluster Details</div>}
      button1={<button onClick={() => setIsOpen(false)}>Close</button>}
      button2={undefined}
    />
    </div>
  );
};

export default ClusterList;
