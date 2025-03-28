"use client";

import { motion } from "framer-motion";
import { MyButton } from "@/components/buttons/mybutton";
import { MdPerson } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import MyModal from "@/components/modals/mymodal";
import MemberControl from "./actions/memberControl";
import CreateMember from "./actions/createMember";
import { Spinner } from "@nextui-org/react";
import { MemberInfoType } from "@/types/clusterInfo.types";
import { useState } from "react";

interface MemberInfoProps {
  members: MemberInfoType[];
  fetchClusterInfo: () => void;
  clusterId: string;
  loading: boolean;
}

const MemberInfo: React.FC<MemberInfoProps> = ({
  members,
  fetchClusterInfo,
  clusterId,
  loading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberInfoType>();
  return (
    <div className="h-full w-full flex flex-col ">
      <div className="flex justify-between p-2">
        <div className="flex gap-2 mt-1">
          <MdPerson size={26} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Manage Members
          </h2>
        </div>
        {!loading && (
        <MyButton
          className="bg-black dark:bg-white"
          size="sm"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <GrAdd size={20} className="dark:text-black text-white" />
        </MyButton>
        )}
      </div>
      <div className=" mt-2 h-full overflow-auto">
        {!loading ? (
        <div className="space-y-2 p-2 mt-1 h-full ">
          {members &&
            members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 3 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: index * 0.05 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedMember(member);
                  setIsInfoOpen(true);
                }}
                className="bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer"
              >
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {member.username}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {member.email}
                    </p>
                  </div>
                  <div>
                    {/* {member.deactivated === 0 ? "Active" : "Deactivated"} */}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
        ) : (
          <div className="flex h-full justify-center items-center text-lg">
        <Spinner size="lg" color="current" className="dark:text-white text-black " />
          </div>
        )}
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
              clusterId={clusterId}
              setIsOpen={setIsOpen}
            />
          }
          button1={undefined}
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
          content={selectedMember && <MemberControl member={selectedMember} setIsOpen={setIsInfoOpen} fetchClusterInfo={fetchClusterInfo}/>}
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

export default MemberInfo;
