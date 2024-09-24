import { MyButton } from "@/components/buttons/mybutton";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import { MdWarning } from "react-icons/md";

interface DeactivateClusterProps {
    clusterUlid: string;
    clusterName: string;
    setIsOpen: (value: boolean) => void;
    fetchClusterInfo: () => void;
}

const DeactivateCluster: React.FC<DeactivateClusterProps> = ({ clusterName,clusterUlid,setIsOpen,fetchClusterInfo}) => {

    const handleDeactivateCluster = async () => {
        try {
            const response = await myInstance.patch(`/organization/cluster/deactivate/${clusterUlid}`);
            toast.success(response.data.message);
            fetchClusterInfo();
            setIsOpen(false);
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <div className="p-4 b rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Are you sure you want to deactivate the cluster &quot;{clusterName}&quot;?
            </h2>
            <div className="flex gap-2 ">
                <MdWarning className="text-yellow-500"  size={26}/>
                <span className="text-yellow-500 text-sm font-semibold">Deactivating the cluster will deactivate all the members and events associated with it.</span>
            </div>
            <div className="flex justify-center gap-4 mt-4">
                <MyButton className="" color="warning" size="md"
                onClick={()=>{handleDeactivateCluster()}}>
                    <span className="text-black text-md font-medium">Deactivate</span>
                </MyButton>
                <MyButton className="bg-black dark:bg-white" size="md"
                onClick={() => {setIsOpen(false);}}
                >
                    <span className="text-white dark:text-black text-md font-medium">Cancel</span>
                </MyButton>
            </div>
        </div>
    );
}

export default DeactivateCluster;
