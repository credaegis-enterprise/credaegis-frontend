import MemberView from "./info/memberView";
import EventView from "./info/eventView";
import StatsDisplayBox from "./info/statsDisplayBox";
import { MemberType,EventType,MemberStatistics } from "@/types/global.types";



interface ManageAllProps {
    members: MemberType[];
    events: EventType[];
    clusterAdminUlid: string;
    stats: MemberStatistics;
    }



const ManageAll: React.FC<ManageAllProps> = ({members,events,clusterAdminUlid,stats}) => {
  return (
   <div className="flex flex-col h-full p-2 ">
    <div className="grid grid-cols-1 lg:grid-cols-3  h-full gap-5">
        <div className="flex flex-col border dark:border-stone-800 rounded-lg h-full">
            <MemberView members={members} clusterAdminUlid={clusterAdminUlid} />
        </div>
        <div className="flex flex-col h-full border dark:border-stone-800 rounded-lg overflow-auto">
            <EventView events={events}  />
        </div>
        <div className="">
           <StatsDisplayBox stats={stats} />
        </div>
    </div>
   </div>
  );
}

export default ManageAll;