import React, { useState } from "react";
import { MyButton } from "@/components/buttons/mybutton";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import { Input, Textarea } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { MdWarning } from "react-icons/md";
import { useRouter } from "next/navigation";
import { EventInfoType } from "@/types/clusterInfo.types";

interface EventControlProps {
  event: EventInfoType;
  setIsOpen: (value: boolean) => void;
}

const EventControl: React.FC<EventControlProps> = ({ event, setIsOpen }) => {
  const router = useRouter();
  const [renamePrompt, setRenamePrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState(event.name);
  const [eventDescription, setEventDescription] = useState(event.description);
  const [invalid, setInvalid] = useState(false);

  console.log(event);

  const handleActivateEvent = async () => {
    setLoading(true);
    try {
      const response = await myInstance.put(
        `/member/event-control/activate/${event.id}`
      );
      toast.success(response.data.message);
      setIsOpen(false);
      router.refresh();
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDeactivateEvent = async () => {
    setLoading(true);
    try {
      const response = await myInstance.put(
        `/member/event-control/deactivate/${event.id}`
      );
      toast.success(response.data.message);
      setIsOpen(false);
      router.refresh();
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleRenameEvent = async () => {
    setLoading(true);
    setInvalid(false);
    if (eventName === "") {
      setInvalid(true);
      return;
    }

    if(eventDescription === ""){
      setInvalid(true);
      return;
    }
    try {
      const response = await myInstance.put(`/member/event-control/update/${event.id}`, {
        eventName: eventName,
        eventDescription: eventDescription,
      });
      toast.success(response.data.message);
      setIsOpen(false);
      router.refresh();
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6 ">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2">
          <div className="text-3xl font-bold ">{event.name}</div>
          <div className="text-lg  font-normal text-gray-200">{event.description}</div>
          <span className="text-lg ">{}</span>
          <span className="text-sm text-gray-400 ">
            created at: {new Date(event.createdOn).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          {!renamePrompt && (
            <>
              {!event.deactivated ? (
                <MyButton
                  color="warning"
                  className=""
                  size="md"
                  isLoading={loading}
                  spinner={<Spinner size="sm" color="default" />}
                  onClick={() => {
                    handleDeactivateEvent();
                  }}
                >
                  <span className="text-black  text-sm font-medium">
                    Deactivate
                  </span>
                </MyButton>
              ) : (
                <MyButton
                  className="bg-black dark:bg-white"
                  size="md"
                  isLoading={loading}
                  spinner={<Spinner size="sm" color="default" />}
                  onClick={() => {
                    handleActivateEvent();
                  }}
                >
                  <span className="text-white dark:text-black text-sm font-medium">
                    Activate
                  </span>
                </MyButton>
              )}

              <MyButton
                size="md"
                className="bg-green-400"
                onClick={() => {
                  setRenamePrompt(true);
                }}
              >
                <span className="text-black text-sm font-medium">Edit</span>
              </MyButton>
            </>
          )}
          {renamePrompt && (
            <div className="flex flex-col justify-center w-full gap-4">
              <div className="flex gap-2 ">
                <MdWarning className="text-yellow-400" size={26} />
                <span className="text-yellow-500 text-sm font-semibold">
                  This name will be the new name all the certificates are
                  registered under
                </span>
              </div>
              <Input
                type="text"
                label="Enter the new name"
                size="md"
                className="w-full"
                value={eventName}
                isInvalid={invalid}
                errorMessage="Name cannot be empty"
                onChange={(e) => setEventName(e.target.value)}
              />

<Textarea
                type="text"
                label="Enter the new description"
                size="md"
                className="w-full"
                value={eventDescription}
                isInvalid={invalid}
                errorMessage="Description cannot be empty"
                onChange={(e) => setEventDescription(e.target.value)}
              />


              <MyButton
                className="dark:bg-white bg-black"
                size="md"
                onClick={() => {
                  setRenamePrompt(false);
                }}
              >
                <span className="text-white dark:text-black text-sm font-medium">
                  Cancel
                </span>
              </MyButton>
              <MyButton
                className="bg-green-400"
                size="md"
                spinner={<Spinner size="sm" color="default" />}
                isLoading={loading}
                onClick={() => {
                  handleRenameEvent();
                }}
              >
                <span className="text-black text-sm font-medium">Confirm</span>
              </MyButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventControl;
