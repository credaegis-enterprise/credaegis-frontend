import MemberView from "./info/memberView";
import EventView from "./info/eventView";
import DisplayBox from "./info/displayBox";

const ManageAll: React.FC = () => {
  return (
   <div className="flex flex-col h-full p-2 ">
    <div className="grid grid-cols-3 h-full gap-5">
        <div className="border dark:border-stone-800 rounded-lg">
            <MemberView members={[]} cluster_ulid="1" />
        </div>
        <div className="border dark:border-stone-800 rounded-lg">
            <EventView events={[]} cluster_ulid="1" />
        </div>
        <div className="">
           <DisplayBox />
        </div>
    </div>
   </div>
  );
}

export default ManageAll;