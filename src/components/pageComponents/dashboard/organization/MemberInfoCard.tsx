import { Member } from "./memberView";
import React, { useState } from "react";
import { MyButton } from "@/components/buttons/mybutton";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";

interface MemberInfoProps {
  member: Member;
  setIsOpen: (value: boolean) => void;
  fetchClusterInfo: () => void;
}



const MemberInfoCard: React.FC<MemberInfoProps> = ({ member,setIsOpen,fetchClusterInfo }) => {

  const handleDeactivateMember = async () => {
    try {
      const response = await myInstance.patch("/member/deactivate", {
        member_ulid: member.member_ulid,
      });
      toast.success(response.data.message);
      setIsOpen(false);
      fetchClusterInfo()
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleActivateMember = async () => {
    try {
      const response = await myInstance.patch("/member/activate", {
        member_ulid: member.member_ulid,
      });
      toast.success(response.data.message);
      setIsOpen(false);
      fetchClusterInfo()
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col gap-6 p-6 ">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2">
          <div className="text-3xl font-bold ">{member.member_name}</div>
          <span className="text-lg ">{member.member_email}</span>
          <span className="text-sm text-gray-400 ">created at: {new Date(member.created_at).toLocaleString()}</span>
        </div>
        <div className="flex justify-center gap-6 mt-4">
  
          {!member.deactivated ? (
            <MyButton color="warning" className="" size="md"
             onClick={()=>{
              handleDeactivateMember();
             }}>
              <span className="text-black  text-sm font-medium">Deactivate</span>
            </MyButton>
          ) : (
            <MyButton className="bg-black dark:bg-white" size="md"
            onClick={() => {handleActivateMember();}}
            >
              <span className="text-white dark:text-black text-sm font-medium">Activate</span>
            </MyButton>
          )}

          <MyButton color="danger"  size="md">
            <span className="text-white text-sm font-medium">Delete</span>
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default MemberInfoCard;
