import { MemberType } from "@/types/global.types";
import React, { useState } from "react";
import { MyButton } from "@/components/buttons/mybutton";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { set } from "lodash";
import { Input } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { MdWarning } from "react-icons/md";



interface MemberActionProps {
  member: MemberType
  setIsOpen: (value: boolean) => void;
}



const MemberActions: React.FC<MemberActionProps> = ({ member,setIsOpen}) => {


  const router = useRouter();
  const [deletePrompt,setDeletePrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [invalid, setInvalid] = useState(false);



  const handleDelete = async () => {

    setLoading(true);
    setInvalid(false);
    if(memberEmail !== member.member_email){
      toast.error("Email does not match");
      setInvalid(true);
      setLoading(false);
      return;
    }


    try {
      const response = await myInstance.put(`/member/member-control/delete/${member.member_ulid}`);
      toast.success(response.data.message);
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data.message || "An error occurred");
      console.log(error);
    }

    setLoading(false);
    router.refresh();
  }
  
  const handleDeactivateMember = async () => {
    try {
      
      const response = await myInstance.put(`/member/member-control/deactivate/${member.member_ulid}`);
      toast.success(response.data.message);
      setIsOpen(false);
  
    } catch (error: any) {
      toast.error(error.response?.data.message || "An error occurred");
      console.log(error);
    }

    router.refresh();
  };

  const handleActivateMember = async () => {
    try {
      const response = await myInstance.put(`/member/member-control/activate/${member.member_ulid}`);
      toast.success(response.data.message);
      setIsOpen(false);
     
    } catch (error: any) {
      toast.error(error.response?.data.message || "An error occurred");
      console.log(error);
    }

    router.refresh();
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
          {!deletePrompt && (
  <>
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

          <MyButton color="danger"  size="md" onClick={()=>{setDeletePrompt(true)}}>
            <span className="text-white text-sm font-medium">Delete</span>
          </MyButton>
          </>
          )}
        </div>
        {deletePrompt &&
        <div className="flex flex-col justify-center w-full gap-4">
            <div className="flex gap-2 ">
                <MdWarning className="text-yellow-500"  size={26}/>
                <span className="text-yellow-500 text-sm font-semibold">This will delete the member from this cluster. The history will be still available</span>
            </div>
        <Input type="text" label="Type the email of the member to confirm" size="md" className="w-full" value={memberEmail}
        isInvalid={invalid}
        errorMessage="Email does not match"
          onChange={(e) => setMemberEmail(e.target.value)}
        />

          <MyButton  className="dark:bg-white bg-black" size="md"
          onClick={()=>{
            setDeletePrompt(false);
          }}>
            <span className="text-white dark:text-black text-sm font-medium">Cancel</span>
          </MyButton>
          <MyButton color="danger" className="" size="md"
           spinner={<Spinner size="sm" color="default" />}
           isLoading={loading}
          onClick={()=>{
            
            handleDelete();
          }}>
            <span className="text-white text-sm font-medium">Confirm</span>
          </MyButton>
        </div>
        }
        
      </div>
    </div>
  );
};

export default MemberActions;
