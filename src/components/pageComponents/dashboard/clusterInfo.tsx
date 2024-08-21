'use client';

import React, { useState } from 'react';

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

interface ClusterInfoProps {
  cluster: Cluster;
}

const ClusterInfo: React.FC<ClusterInfoProps> = ({ cluster }) => {
  const [isActive, setIsActive] = useState(cluster.deactivated === 0);

  const handleToggleStatus = () => {
    setIsActive(prev => !prev);
  };

  return (
    <div className="p-2 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">{cluster.cluster_name}</h1>
      <p className="text-gray-600">Cluster ULID: {cluster.cluster_ulid}</p>
      <p className="text-gray-600">Created At: {new Date(cluster.created_at).toLocaleString()}</p>
      <p className="text-gray-600">Admin Email: {cluster.member_email}</p>
      <button
        onClick={handleToggleStatus}
        className={`px-4 py-2 rounded-lg font-semibold text-white ${isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
      >
        {isActive ? 'Deactivate' : 'Activate'}
      </button>
    </div>
  );
}

export default ClusterInfo;
