import MemberView from "./info/memberView";
import EventView from "./info/eventView";
import StatsDisplayBox from "./info/statsDisplayBox";
import { MemberType,EventType,MemberStatistics } from "@/types/global.types";
import { EventInfoType, MemberInfoType } from "@/types/clusterInfo.types";



interface ManageAllProps {
    members: MemberInfoType[];
    events: EventInfoType[];

    }



const ManageAll: React.FC<ManageAllProps> = ({members,events}) => {
  return (
   <div className="flex flex-col h-full p-2 ">
    <div className="grid grid-cols-1 lg:grid-cols-3  h-full gap-5">
        <div className="flex flex-col border dark:border-stone-800 rounded-lg h-full">
            <MemberView members={members}  />
        </div>
        <div className="flex flex-col h-full border dark:border-stone-800 rounded-lg overflow-auto">
            <EventView events={events}  />
        </div>
        <div className="">
           {/* <StatsDisplayBox stats={stats} /> */}
        </div>
    </div>
   </div>
  );
}

export default ManageAll;