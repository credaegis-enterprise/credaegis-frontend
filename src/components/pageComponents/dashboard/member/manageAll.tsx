import MemberView from "./info/memberView";
import EventView from "./info/eventView";
import DisplayBox from "./info/displayBox";
import { MemberType,EventType } from "@/types/global.types";



interface ManageAllProps {
    members: MemberType[];
    events: EventType[];
    clusterAdminUlid: string;
    }



const ManageAll: React.FC<ManageAllProps> = ({members,events,clusterAdminUlid}) => {
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
           <DisplayBox />
        </div>
    </div>
   </div>
  );
}

export default ManageAll;