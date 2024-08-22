'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MyModal from '@/components/modals/mymodal';

type Event = {
    event_ulid: string;
    event_name: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
};

interface EventsListProps {
  events: Event[];
}

const EventList: React.FC<EventsListProps> = ({ events }) => {
  console.log(events);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="space-y-2 p-2">
        {events && events.map((event, index) => (
          <motion.div
            key={event.event_ulid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.01, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {event.event_name}
            </h3>
          </motion.div>
        ))}
      </div>
      <MyModal
        size="md"
        isOpen={isOpen}
        backdrop="blur"
        onClose={() => setIsOpen(false)}
        title="Event Details"
        content={<div>Event Details</div>}
        button1={<button onClick={() => setIsOpen(false)}>Close</button>}
        button2={undefined}
        onOpen={() => {setIsOpen(true);}}
      />
    </div>
  );
};

export default EventList;
