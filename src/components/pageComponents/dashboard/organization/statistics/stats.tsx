import { StatisticsType } from "@/types/global.types";
import { AiOutlineBarChart, AiOutlineFileSearch, AiOutlineUsergroupAdd } from "react-icons/ai"; // Example icons

interface StatsProps {
  stats: StatisticsType;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="flex flex-col h-full p-6 rounded-lg shadow-lg">
      <div className="grid grid-rows-2 h-full gap-6">
        {/* First row for organization and certificates stats */}
        <div className="row-span-1 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Organization Stats */}
            <div className="flex flex-col gap-4 border border-gray-200 dark:border-stone-800 rounded-lg p-4 shadow-md">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <AiOutlineUsergroupAdd className="text-2xl text-blue-500" />
                <span>Organization Stats</span>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Events</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.organization_statistics.total_events}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Members</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.organization_statistics.total_members}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Clusters</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.organization_statistics.total_clusters}</span>
                </div>
              </div>
            </div>

            {/* Certificates Stats */}
            <div className="flex flex-col gap-4 border border-gray-200 dark:border-stone-800 rounded-lg p-4 shadow-md">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <AiOutlineFileSearch className="text-2xl text-green-500" />
                <span>Certificates Stats</span>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Issued</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.certificate_statistics.total_issued_certificates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Expired</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.certificate_statistics.total_expired_certificates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Revoked</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.certificate_statistics.total_revoked_certificates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Rejected</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.certificate_statistics.total_rejected_certificates}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second row for cluster and member stats */}
        <div className="row-span-1 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Top Cluster Stats */}
            <div className="flex flex-col gap-4 border border-gray-200 dark:border-stone-800 rounded-lg p-4 shadow-md">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <AiOutlineBarChart className="text-2xl text-purple-500" />
                <span>Top Cluster</span>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cluster Name</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.top_cluster.cluster_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Certificates Issued</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.top_cluster.total_certificates_issued}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Certificates Revoked</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.top_cluster.total_certificates_revoked}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Certificates Rejected</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.top_cluster.total_certificates_rejected}</span>
                </div>
              </div>
            </div>

            {/* Top Event Stats */}
            <div className="flex flex-col gap-4 border border-gray-200 dark:border-stone-800 rounded-lg p-4 shadow-md">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <AiOutlineFileSearch className="text-2xl text-yellow-500" />
                <span>Top Event</span>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Event Name</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.top_event.event_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cluster Name</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.top_event.event_under_cluster}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Certificates Issued</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.top_event.total_certificates_issued}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
