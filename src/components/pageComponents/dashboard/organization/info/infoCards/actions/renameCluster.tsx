
import {Input,Spinner } from "@nextui-org/react"
import { MyButton } from "@/components/buttons/mybutton";
import { myInstance } from "@/utils/Axios/axios"
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



interface RenameClusterProps {
    clusterName: string;
    clusterUlid: string;
    setIsOpen: (isOpen: boolean) => void;
    fetchClusterInfo: () => void;
}


const RenameCluster: React.FC<RenameClusterProps> = ({
    clusterName,
    clusterUlid,
    setIsOpen,
    fetchClusterInfo,
}) => {

    const router = useRouter();
    const [newClusterName, setClusterName] = useState(clusterName);
    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        setClusterName(clusterName);
    }
    , [clusterName]);


    const renameCluster = async () => {
         setLoading(true);
         setInvalid(false);
        if(newClusterName === ""){
            setInvalid(true);
            return;
        }
        try {
            await myInstance.put(`/organization/cluster-control/rename`, {
                clusterUlid: clusterUlid,
                newClusterName: newClusterName,
            });
            fetchClusterInfo();
            setIsOpen(false);
            toast.success("Cluster renamed successfully.");
        } catch (error) {
           console.log(error);
        }
        setLoading(false);
        router.refresh();
    }

    return(
        <div>
        <div className="flex flex-col gap-4">
         <Input
            label="Cluster Name"
            isInvalid={invalid}
            errorMessage="Cluster name cannot be empty"
            placeholder="Enter new cluster name"
            value={newClusterName}
            onChange={(e) => setClusterName(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <MyButton
            className="bg-black dark:bg-white"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Cancel
            </span>
          </MyButton>
          <MyButton
           spinner={<Spinner color="default" size="md" />}
           isLoading={loading}
            className="bg-green-400"
            size="sm"
            onClick={() => 
            renameCluster()
            }
          >
            <span className="dark:text-black text-white text-md font-medium">
              Rename
            </span>
          </MyButton>
        </div>
      </div>
    )
}


export default RenameCluster;