import EventList from "./eventList";
import CardHeader from "./cardHeader";
import CreateEvent from "./createEvent";
import { MdEvent } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdInfo } from "react-icons/md";

const Info = () => {
    return(
        <div className="flex flex-col h-full w-full gap-4 p-2 mt-3">
            {/* Full-width section with fixed height */}
            <div className="flex w-full  lg:h-64  p-4 rounded-lg border border-gray-200 dark:border-stone-800">
             <CardHeader title="Cluster Info"  icon={<MdInfo size={26}   />} modalTitle="" />
            </div>
            {/* Row that only splits on large screens with flex-grow for full height */}
            <div className="flex flex-col lg:flex-row w-full gap-4 flex-grow mb-8 ">
                <div className="flex w-full lg:w-1/2  lg:h-auto  p-4 rounded-lg flex-grow border border-gray-200 dark:border-stone-800">
                <CardHeader title="Manage Events" icon={<MdEvent size={26} />} buttonTitle="Add" modalTitle="Add an event" />
         
                </div>
                <div className="flex w-full lg:w-1/2  lg:h-auto   p-4 rounded-lg flex-grow border border-gray-200 dark:border-stone-800">
                <CardHeader title="Manage Members" icon={<MdPerson size={26} />} buttonTitle="Add" modalTitle="Add a member" />
                </div>
            </div>
        </div>
    )
}

export default Info;
