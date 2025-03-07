"use client";

import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Button, Input } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
interface CreateEventProps {
  setIsOpen : (value:boolean) => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({
  setIsOpen
}) => {
  const [eventName, setEventName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [invalid, setInvalid] = useState(false);
  const router = useRouter();


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
      const response = await myInstance.post("/member/event-control/create", {
        eventName: eventName,
        description: description,
        clusterId: "not required"
      });

      toast.success(response.data.message);
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
    }

    setIsLoading(false);
    router.refresh();
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

    <Input
          isRequired={true}
          type="text"
          label="Description"
          size="md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
