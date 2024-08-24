"use client";

import { motion } from "framer-motion";
import { MyButton } from "@/components/buttons/mybutton";
import { MdPerson } from "react-icons/md";
import MyModal from "@/components/modals/mymodal";
import { useState } from "react";
import MemberInfoCard from "./MemberInfoCard";
import CreateMember from "./actions/createMember";

export type Member = {
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

interface MemberViewProps {
  members: Member[];
  fetchClusterInfo: () => void;
  cluster_ulid: string;
}

const MemberView: React.FC<MemberViewProps> = ({
  members,
  fetchClusterInfo,
  cluster_ulid,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member>({} as Member);
  return (
    <div className="h-full w-full flex flex-col ">
      <div className="flex justify-between p-2">
        <div className="flex gap-2 mt-1">
          <MdPerson size={26} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Manage Members
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
      <div className=" mt-2 h-full overflow-auto">
        <div className="space-y-2 p-2 mt-1 h-full ">
          {members &&
            members.map((member, index) => (
              <motion.div
                key={member.member_ulid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedMember(member);
                  setIsInfoOpen(true);
                }}
                className="bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer"
              >
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {member.member_name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {member.member_email}
                    </p>
                  </div>
                  <div>
                    {/* {member.deactivated === 0 ? "Active" : "Deactivated"} */}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
      {isOpen && (
        <MyModal
          size="md"
          isOpen={isOpen}
          backdrop="blur"
          onClose={() => setIsOpen(false)}
          title="Add Member"
          content={
            <CreateMember
              fetchClusterInfo={fetchClusterInfo}
              cluster_ulid={cluster_ulid}
              setIsOpen={setIsOpen}
            />
          }
          button1={<button onClick={() => setIsOpen(false)}>Close</button>}
          button2={undefined}
          onOpen={() => {
            setIsOpen(true);
          }}
        />
      )}
      {isInfoOpen && (
        <MyModal
          size="sm"
          isOpen={isInfoOpen}
          backdrop="blur"
          onClose={() => setIsInfoOpen(false)}
          title="Member Info"
          content={<MemberInfoCard member={selectedMember || undefined} setIsOpen={setIsInfoOpen} fetchClusterInfo={fetchClusterInfo}/>}
          button1={undefined}
          button2={undefined}
          onOpen={() => {
            setIsInfoOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default MemberView;
