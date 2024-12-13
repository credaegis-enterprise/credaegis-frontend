import { MemberType } from "@/types/global.types";
import { Select, SelectItem } from "@nextui-org/react";
import { MdWarning } from "react-icons/md";
import { MyButton } from "@/components/buttons/mybutton";
import { useState } from "react";
import { toast } from "sonner";
import { myInstance } from "@/utils/Axios/axios";
import { Spinner } from "@nextui-org/react";
import { set } from "lodash";
import { MemberInfoType } from "@/types/clusterInfo.types";


interface ChangeAdminProps {
  clusterUlid: string;
  fetchClusterInfo: () => void;
  members: MemberInfoType[];
  setIsOpen: (value: boolean) => void;
  adminUlid: string;
}

const ChangeAdmin: React.FC<ChangeAdminProps> = ({
  clusterUlid,
  fetchClusterInfo,
  members,
  setIsOpen,
  adminUlid,
}) => {

  const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(selectedAdmin);
    console.log(clusterUlid);
    console.log(adminUlid);

  const handleChangeAdmin = async () => {
    
     setIsLoading(true);
    if (selectedAdmin === null) {
      setIsLoading(false);
      toast.error("Please select a member");
      setInvalid(true);
      return;
    }

    try {
      const response = await myInstance.put(`/organization/cluster-control/change-admin/${clusterUlid}/${selectedAdmin}`);
      toast.success(response.data.message);
      fetchClusterInfo();
      setIsOpen(false);

    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

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
          .filter((member) => member.id !== adminUlid)
          .map((member) => (
            <SelectItem key={member.id} value={member.id}>
              {member.username}
            </SelectItem>
          ))}
      </Select>
      <div className="flex gap-2 ">
        <MdWarning className="text-yellow-500" size={26} />
        <span className="text-yellow-500 text-sm font-semibold">
          The new admin will get all the permission over this cluster.
        </span>
      </div>
      <div className="flex justify-center gap-2">
        <MyButton
          className=""
          spinner={<Spinner size="sm" color="default" />}
          isLoading={isLoading}
          color="success"
          size="md"
          onClick={() => handleChangeAdmin()}
        >
          <span className="text-black text-md font-medium">Change Admin</span>
        </MyButton>
        <MyButton
          className="dark:bg-white  bg-black"
          size="md"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-md font-medium text-white dark:text-black">
            Cancel
          </span>
        </MyButton>
      </div>
    </div>
  );
};

export default ChangeAdmin;
