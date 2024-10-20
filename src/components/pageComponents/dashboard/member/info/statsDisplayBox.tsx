import { MemberStatistics } from "@/types/global.types";
import { FaUsers, FaCertificate } from "react-icons/fa";

interface StatsDisplayBoxProps {
  stats: MemberStatistics;
}

const StatsDisplayBox: React.FC<StatsDisplayBoxProps> = ({ stats }) => {
  return (
    <div className="grid grid-rows-2 gap-5 h-full">
      {/* Cluster Stats */}
      <div className="border dark:border-stone-800 rounded-lg p-5  ">
        <div className="flex items-center gap-3 mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          <FaUsers className="text-3xl text-blue-500" />
          <span>Cluster Stats</span>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Members</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {stats.cluster_stats.total_members}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Events</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {stats.cluster_stats.total_events}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Issued Certificates</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {stats.cluster_stats.total_issued_certificates}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Revoked Certificates</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {stats.cluster_stats.total_revoked_certificates}
            </span>
          </div>
        </div>
      </div>

      {/* Event Stats */}
      <div className="border dark:border-stone-800 rounded-lg p-5 ">
        <div className="flex items-center gap-3 mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          <FaCertificate className="text-3xl text-green-500" />
          <span>Event Stats</span>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Most active Event</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {stats.event_stats.event_name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Certificates Issued</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {stats.event_stats.total_certificates_issued}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Certificates Revoked</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {stats.event_stats.total_certificates_revoked}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplayBox;
