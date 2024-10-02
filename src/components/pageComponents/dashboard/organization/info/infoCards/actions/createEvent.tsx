"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/react";

interface CreateEventProps {
  clusterUlid: string;
  fetchClusterInfo: () => void;
  setIsOpen : (value:boolean) => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({
  clusterUlid,
  fetchClusterInfo,
  setIsOpen
}) => {
  const [eventName, setEventName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);


  const handleEventCreate = async () => {
    setInvalid(false);
    setIsLoading(true);

    if (eventName === "") {
      setInvalid(true);
      setIsLoading(false);
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await myInstance.post("/organization/event-control/create", {
        eventName: eventName,
        clusterUlid: clusterUlid,
      });

      toast.success(response.data.message);
      fetchClusterInfo();
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <Input
          isRequired={true}
          type="text"
          label="Event Name"
          size="md"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <MyButton
          className="bg-black dark:bg-white"
          size="md"
          spinner={<Spinner size="sm" color="default" />}
          isLoading={isLoading}
          onClick={handleEventCreate}
        >
          <span className="dark:text-black text-white text-md font-medium">
            Create Event
          </span>
        </MyButton>
      </div>
    </div>
  );
};

export default CreateEvent;
