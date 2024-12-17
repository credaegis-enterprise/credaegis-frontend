'use client'

import { MdEvent } from "react-icons/md";
import { MyButton } from "@/components/buttons/mybutton";
import { motion } from "framer-motion";
import { useTabContext } from "@/context/tabContext";
import { useState } from "react";
import MyModal from "@/components/modals/mymodal";
import CreateEvent from "./actions/createEvent";
import { EventType } from "@/types/global.types";
import EventControl from "./actions/eventControl";
import { set } from "lodash";
import { EventInfoType } from "@/types/clusterInfo.types";

interface EventsViewProps {
  events: EventInfoType[];

}


const EventView: React.FC<EventsViewProps> = ({ events }) => {

    

 const [isOpen, setIsOpen] = useState(false);
 const [isInfoOpen, setIsInfoOpen] = useState(false);
 const [selectedEvent, setSelectedEvent] =  useState<EventInfoType>({} as EventInfoType);


  return (
    <div className="lg:h-full h-[300px] w-full flex flex-col ">
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
      <div className=" mt-2 flex flex-col h-full  overflow-auto">
        <div className="space-y-2 p-2 mt-1 h-full">
          {!events? (
            <div className="flex h-full justify-center items-center text-lg">
              No events available.
            </div>
          ) : (
         
          
          events && events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: index * 0.015 }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => {setSelectedEvent(event); setIsInfoOpen(true);}}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {event.name}
              </h3>
            </motion.div>
          ))
      
          )}
        </div>

      
    
      </div>
      {isOpen && (

        <MyModal
          size="lg"
          isOpen={isOpen}
            backdrop="blur"
            onClose={() => setIsOpen(false)}
            title="Create an Event"
            content={<CreateEvent  setIsOpen={setIsOpen}/>}
            button1={<button onClick={() => setIsOpen(false)}>Close</button>}
            button2={undefined}
            onOpen={() => {setIsOpen(true);}}
        />
        )}
         {isInfoOpen && (
        <MyModal
          size="lg"
          isOpen={isInfoOpen}
          backdrop="blur"
          onClose={() => setIsInfoOpen(false)}
          title="Event info"
          content={<EventControl event={selectedEvent || undefined} setIsOpen={setIsInfoOpen} />}
          button1={undefined}
          button2={undefined}
          onOpen={() => {
            setIsInfoOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default EventView;
