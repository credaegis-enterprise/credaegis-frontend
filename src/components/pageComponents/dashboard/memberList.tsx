'use client';

import React from 'react';
import { motion } from 'framer-motion';

type Member = {
  member_ulid: string;
  member_name: string;
  member_email: string;
  member_password: string;
  created_at: string;
  updated_at: string;
  deactivated: number;
  deleted: number;
  cluster_ulid: string;
};

interface MemberListProps {
  members: Member[];
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
    console.log(members);
  return (
    <div className="relative">
      <div className="space-y-2 p-2 mt-1">
        {members && members.map((member, index) => (
          <motion.div
            key={member.member_ulid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.01, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer"
          >
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {member.member_name}
            </h3>
            
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
