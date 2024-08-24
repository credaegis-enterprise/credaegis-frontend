import { MdInfo } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { MyButton } from "@/components/buttons/mybutton";
import { useState } from "react";
import MyModal from "@/components/modals/mymodal";
import DeactivateCluster from "./actions/deactivateCluster";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import ChangeAdmin from "./actions/changeAdmin";

interface AdminInfo {
  admin_email: string;
  admin_name: string;
  admin_ulid: string;
}

export interface MemberInfo {
  created_at: string;
  deactivated: number;
  member_email: string;
  member_name: string;
  member_ulid: string;
  updated_at: string;
}

interface ClusterInfo {
  cluster_ulid: string;
  cluster_name: string;
  organization_ulid: string;
  created_at: string;
  updated_at: string;
  deactivated: number;
  adminInfo: AdminInfo[];
  membersInfo: MemberInfo[];
}

interface ClusterInfoProps {
  cluster: ClusterInfo | undefined;
  fetchClusterInfo: () => void;
}

const ClusterInfo: React.FC<ClusterInfoProps> = ({
  cluster,
  fetchClusterInfo,
}) => {
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
            cluster_name={cluster.cluster_name}
            cluster_ulid={cluster.cluster_ulid}
            setIsOpen={setIsOpen}
            fetchClusterInfo={fetchClusterInfo}
          />
        );
        case "changeAdmin":
            return (
                <ChangeAdmin
                admin_ulid={admin.admin_ulid}
                setIsOpen={setIsOpen}
                cluster_ulid={cluster.cluster_ulid}
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
      const response = await myInstance.patch("/cluster/activate", {
        cluster_ulid: cluster.cluster_ulid,
      });
      toast.success(response.data.message);
      fetchClusterInfo();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <div className="h-full p-4 rounded-lg shadow-sm flex flex-col lg:flex-row lg:items-center lg:gap-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 w-full">
        <div className="flex items-center gap-4">
          <MdInfo size={32} className="text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {cluster.cluster_name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Created at: {new Date(cluster.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-2 mt-4 lg:mt-0">
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
            className="bg-black dark:bg-white"
            size="sm"
            onClick={() => handleOpenModal("delete")}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Delete
            </span>
          </MyButton>
        </div>
      </div>

      {/* Admin Info Section */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 border-t border-gray-200 dark:border-stone-800 pt-4 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-8">
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

      {/* Button to Change Admin */}
      <div className="flex justify-end mt-4 lg:mt-0">
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

      {/* Modal */}
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
