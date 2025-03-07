import { MdInfo } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { MyButton } from "@/components/buttons/mybutton";
import { useState } from "react";
import MyModal from "@/components/modals/mymodal";
import DeactivateCluster from "./actions/deactivateCluster";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import ChangeAdmin from "./actions/changeAdmin";
import { useRouter } from "next/navigation";
import { ClusterInfoType } from "@/types/global.types";
import RenameCluster from "./actions/renameCluster";
import { Input, Spinner } from "@nextui-org/react";
import ClusterDetailsResponseType from "@/types/clusterInfo.types";

interface ClusterInfoProps {
  clusterDetails: ClusterDetailsResponseType | undefined;
  fetchClusterInfo: () => void;
  loading: boolean;
}

const ClusterInfo: React.FC<ClusterInfoProps> = ({
  clusterDetails,
  fetchClusterInfo,
  loading,
}) => {
  const router = useRouter();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clusterName, setClusterName] = useState("");

  console.log("clusterDetails here", clusterDetails);

  if (!clusterDetails) {
    return <div className="text-center">No cluster information available.</div>;
  }

  const admin = clusterDetails.adminInfo

  const handleOpenModal = (action: string) => {
    setSelectedAction(action);
    setIsOpen(true);
  };

  const renderModalContent = () => {
    switch (selectedAction) {
      case "deactivate":
        return (
          <DeactivateCluster
            clusterName={clusterDetails.clusterInfo.name}
            clusterUlid={clusterDetails.clusterInfo.id}
            setIsOpen={setIsOpen}
            fetchClusterInfo={fetchClusterInfo}
          />
        );
      case "changeAdmin":
        return (
          <ChangeAdmin
            adminUlid={clusterDetails.adminInfo.id}
            setIsOpen={setIsOpen}
            clusterUlid={clusterDetails.clusterInfo.id}
            fetchClusterInfo={fetchClusterInfo}
            members={clusterDetails.members}
          />
        );
      case "rename":
        return (
          <RenameCluster
            clusterName={clusterDetails.clusterInfo.name}
            clusterUlid={clusterDetails.clusterInfo.id}
            setIsOpen={setIsOpen}
            fetchClusterInfo={fetchClusterInfo}
          />
        );


      default:
        return null;
    }
  };

  const handleActivateCluster = async () => {
    try {
      const response = await myInstance.put(
        `/organization/cluster-control/activate/${clusterDetails.clusterInfo.id}`
      );

      toast.success(response.data.message);
      fetchClusterInfo();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data.message || "An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="flex  h-full justify-center items-center">
     <Spinner size="lg" color="current" className="dark:text-white text-black " />
      </div>
    );

  }

  return (
    <div className="h-full  rounded-lg shadow-sm overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-5 h-full">
        <div className="col-span-4">
          <div className="grid grid-rows-2 h-full gap-3 ">
            <div className="row-span-1">
              <div className="flex items-center gap-4 ">
                <MdInfo size={32} className="text-blue-500" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {clusterDetails.clusterInfo.name}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Created at: {new Date(clusterDetails.clusterInfo.createdOn).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="row-span-1">
              <div className="flex  lg:justify-start justify-end lg:ml-12  flex-row lg:items-center gap-2 mt-4 lg:mt-0">
                {clusterDetails.clusterInfo.deactivated === false ? (
                  <MyButton
                    className="bg-black dark:bg-white"
                    size="sm"
                    onClick={() => handleOpenModal("deactivate")}
                  >
                    <span className="dark:text-black text-white text-md font-medium">
                      Deactivate
                    </span>
                  </MyButton>
                ) : (
                  <MyButton
                    className="bg-black dark:bg-white"
                    size="sm"
                    onClick={() => {
                      handleActivateCluster();
                    }}
                  >
                    <span className="dark:text-black text-white text-md font-medium">
                      Activate
                    </span>
                  </MyButton>
                )}
                <MyButton
                  className="bg-black dark:bg-white "
                  size="sm"
                  onClick={() => handleOpenModal("rename")}
                >
                  <span className="dark:text-black text-white text-md font-medium">
                    Rename
                  </span>
                </MyButton>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden border-t border-gray-300 dark:border-stone-600 mt-5 mb-5"></div>

        <div className="ml-10 border-l border-gray-300 dark:border-stone-600 mb-5 hidden lg:block lg:w-0.5"></div>
        <div className="col-span-4">
          <div className="grid grid-rows-2 gap-4">
            <div className="row-span-1">
              <div className="flex items-center gap-4">
                <FaUserShield size={32} className="text-green-500" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {admin?.name|| "N/A"}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {admin?.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="row-span-1">
              <div className="flex lg:justify-start justify-end lg:ml-12 mt-4 lg:mt-0">
                <MyButton
                    className={`${
                        clusterDetails.members.length < 2
                            ? "bg-gray-300 cursor-not-allowed opacity-50"
                            : "bg-black dark:bg-white"
                    }`}
                  size="sm"
                  onClick={() => handleOpenModal("changeAdmin")}
                  isDisabled={clusterDetails.members.length < 2}

                >
                  <span className="dark:text-black text-white text-md font-medium">
                    Change Admin
                  </span>
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <MyModal
          size="md"
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          backdrop="blur"
          onClose={() => setIsOpen(false)}
          title={
            selectedAction === "deactivate"
              ? "Deactivate Cluster"
              : selectedAction === "rename"
              ? "Rename Cluster"
              : "Change Admin"
          }
          content={renderModalContent()}
          button1={undefined}
          button2={undefined}
        />
      )}
    </div>
  );
};

export default ClusterInfo;
