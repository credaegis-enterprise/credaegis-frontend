import { MdInfo } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { MyButton } from "@/components/buttons/mybutton";

interface AdminInfo {
  admin_email: string;
  admin_name: string;
  admin_ulid: string;
}

interface ClusterInfo {
  cluster_ulid: string;
  cluster_name: string;
  organization_ulid: string;
  created_at: string;
  updated_at: string;
  deactivated: number;
  adminInfo: AdminInfo[];
}

interface ClusterInfoProps {
  cluster: ClusterInfo | undefined;
}

const ClusterInfo: React.FC<ClusterInfoProps> = ({ cluster }) => {
  if (!cluster) {
    return <div className="text-center">No cluster information available.</div>;
  }

  const admin = cluster.adminInfo[0]; 

  return (
    <div className="h-full p-4 rounded-lg shadow-sm flex flex-col lg:flex-row lg:items-center lg:gap-8">
      {/* Cluster Info Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 w-full">
        <div className="flex items-center gap-4">
          <MdInfo size={32} className="text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{cluster.cluster_name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Created at: {new Date(cluster.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Action Buttons for Cluster Info */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 mt-4 lg:mt-0">
          <MyButton className="bg-black dark:bg-white" size="sm">
            <span className="dark:text-black text-white text-md font-medium">Deactivate</span>
          </MyButton>
          <MyButton className="bg-black dark:bg-white" size="sm">
            <span className="dark:text-black text-white text-md font-medium">Delete</span>
          </MyButton>
        </div>
      </div>

      {/* Admin Info Section */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 border-t border-gray-200 dark:border-stone-800 pt-4 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-8">
        <div className="flex items-center gap-4">
          <FaUserShield size={32} className="text-green-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{admin?.admin_name || "N/A"}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{admin?.admin_email || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Button to Change Admin */}
      <div className="flex justify-end mt-4 lg:mt-0">
        <MyButton className="bg-black dark:bg-white" size="sm">
          <span className="dark:text-black text-white text-md font-medium">Change Admin</span>
        </MyButton>
      </div>
    </div>
  );
};

export default ClusterInfo;
