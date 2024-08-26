import { MemberInfo } from "../clusterInfo";
import { Select, SelectItem } from "@nextui-org/react";
import { MdWarning } from "react-icons/md";
import { MyButton } from "@/components/buttons/mybutton";
import { useState } from "react";
import { toast } from "sonner";
import { myInstance } from "@/utils/Axios/axios";

interface ChangeAdminProps {
  cluster_ulid: string;
  fetchClusterInfo: () => void;
  members: MemberInfo[];
  setIsOpen: (value: boolean) => void;
  admin_ulid: string;
}

const ChangeAdmin: React.FC<ChangeAdminProps> = ({
  cluster_ulid,
  fetchClusterInfo,
  members,
  setIsOpen,
  admin_ulid,
}) => {


const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null);
const [invalid, setInvalid] = useState(false);



  const handleChangeAdmin = async () => {
    if (selectedAdmin === null) {
        toast.error("Please select a member");
        setInvalid(true);
      return;
    }

    try {
      const response = await myInstance.patch("/cluster/changeadmin", {
        cluster_ulid: cluster_ulid,
        new_admin_ulid: selectedAdmin,
      });
      console.log(response.data.message);
      toast.success(response.data.message);
      fetchClusterInfo();
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Select a member to make admin
      </h2>
      <Select 
        required
        isInvalid={invalid}
        errorMessage="Please select a member"
        placeholder="Select a member"
        onChange={(e) => setSelectedAdmin(e.target.value)}
        className="w-full"
      >
     {members
    .filter((member) => member.member_ulid !== admin_ulid) 
    .map((member) => (
      <SelectItem key={member.member_ulid} value={member.member_ulid}>
        {member.member_name}
      </SelectItem>
  ))}
      </Select>
      <div className="flex gap-2 ">
                <MdWarning className="text-yellow-500"  size={26}/>
                <span className="text-yellow-500 text-sm font-semibold">The new admin will get all the permission over this cluster.</span>
            </div>
      <div className="flex justify-center gap-2">
        <MyButton className="" color="success" size="md" onClick={() => handleChangeAdmin()}>
            <span className="text-black text-md font-medium">Change Admin</span>
        </MyButton>
        <MyButton className="dark:bg-white  bg-black" size="md" onClick={() => setIsOpen(false)}>
          <span className="text-md font-medium text-white dark:text-black">Cancel</span>
        </MyButton>
      </div>
    </div>
  );
};

export default ChangeAdmin;
