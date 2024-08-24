import { MdEvent } from "react-icons/md";
import { MyButton } from "@/components/buttons/mybutton";
import { motion } from "framer-motion";
import { useTabContext } from "@/context/tabContext";
import { useState } from "react";
import MyModal from "@/components/modals/mymodal";
import CreateEvent from "./createEvent";

type Event = {
  event_ulid: string;
  event_name: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  cluster_ulid: string;
};

interface EventsViewProps {
  events: Event[];
  fetchClusterInfo: () => void;
    cluster_ulid: string;
}

const EventView: React.FC<EventsViewProps> = ({ events,fetchClusterInfo,cluster_ulid }) => {

 const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between p-2">
        <div className="flex gap-2 mt-1">
          <MdEvent size={26} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Manage Events
          </h2>
        </div>
        <MyButton className="bg-black dark:bg-white" size="sm"
        onClick={()=>{
            setIsOpen(true);
        }}>
          <span className="dark:text-black text-white text-md font-medium">
            Add
          </span>
        </MyButton>
      </div>
      <div className=" mt-2  h-full  overflow-auto">
        <div className="space-y-2 p-2 mt-1 h-full">
          {events && events.map((event, index) => (
            <motion.div
              key={event.event_ulid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {event.event_name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
      {isOpen && (
        <MyModal
          size="md"
          isOpen={isOpen}
            backdrop="blur"
            onClose={() => setIsOpen(false)}
            title="Create an Event"
            content={<CreateEvent fetchClusterInfo={fetchClusterInfo} cluster_ulid={cluster_ulid} setIsOpen={setIsOpen}/>}
            button1={<button onClick={() => setIsOpen(false)}>Close</button>}
            button2={undefined}
            onOpen={() => {setIsOpen(true);}}
        />
        )}
    </div>
  );
};

export default EventView;
