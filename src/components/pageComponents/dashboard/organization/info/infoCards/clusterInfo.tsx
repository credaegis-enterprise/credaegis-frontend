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
import { Spinner } from "@nextui-org/react";

interface ClusterInfoProps {
  cluster: ClusterInfoType | undefined;
  fetchClusterInfo: () => void;
  loading: boolean;
}

const ClusterInfo: React.FC<ClusterInfoProps> = ({
  cluster,
  fetchClusterInfo,
  loading,
}) => {
  const router = useRouter();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (!cluster) {
    return <div className="text-center">No cluster information available.</div>;
  }

  const admin = cluster.adminInfo[0];

  const handleOpenModal = (action: string) => {
    setSelectedAction(action);
    setIsOpen(true);
  };

  const renderModalContent = () => {
    switch (selectedAction) {
      case "deactivate":
        return (
          <DeactivateCluster
            clusterName={cluster.cluster_name}
            clusterUlid={cluster.cluster_ulid}
            setIsOpen={setIsOpen}
            fetchClusterInfo={fetchClusterInfo}
          />
        );
      case "changeAdmin":
        return (
          <ChangeAdmin
            adminUlid={cluster.adminInfo[0].admin_ulid}
            setIsOpen={setIsOpen}
            clusterUlid={cluster.cluster_ulid}
            fetchClusterInfo={fetchClusterInfo}
            members={cluster.membersInfo}
          />
        );

      default:
        return null;
    }
  };

  const handleActivateCluster = async () => {
    try {
      const response = await myInstance.patch(
        `/cluster/activate/${cluster.cluster_ulid}`
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
                    {cluster.cluster_name}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Created at: {new Date(cluster.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="row-span-1">
              <div className="flex  lg:justify-start justify-end lg:ml-12  flex-row lg:items-center gap-2 mt-4 lg:mt-0">
                {cluster.deactivated === 0 ? (
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
                  onClick={() => handleOpenModal("delete")}
                >
                  <span className="dark:text-black text-white text-md font-medium">
                    Delete
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
                    {admin?.admin_name || "N/A"}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {admin?.admin_email || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="row-span-1">
              <div className="flex lg:justify-start justify-end lg:ml-12 mt-4 lg:mt-0">
                <MyButton
                  className="bg-black dark:bg-white"
                  size="sm"
                  onClick={() => handleOpenModal("changeAdmin")}
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
              : selectedAction === "delete"
              ? "Delete Cluster"
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
