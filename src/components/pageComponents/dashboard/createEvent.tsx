'use client';

import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Button, Input } from '@nextui-org/react';
import { MyButton } from '@/components/buttons/mybutton';
import { myInstance } from '@/utils/Axios/axios';
import { toast } from 'sonner';
import { Spinner } from '@nextui-org/react';
import { Select,SelectItem } from '@nextui-org/react';


interface CreateEventProps {
    availableClusters: [];
}

const CreateEvent:React.FC <CreateEventProps> = ({availableClusters}) => {
  const [eventName, setEventName] = useState('');
const [clusterUlid, setClusterUlid] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [invalid,setInvalid] = useState(false);

  const handleEventCreate = async () => {
    setInvalid(false);
    setIsLoading(true);
    console.log(eventName, clusterUlid);

    if (eventName === '' || clusterUlid === '') {
      setInvalid(true);
      setIsLoading(false);
      toast.error('Please fill all the fields');
      return;
    }

    try {
      const response = await myInstance.post('/event/create', {
        event_name: eventName,
        cluster_ulid: clusterUlid,
      });

      toast.success(response.data.message);
      setEventName('');
      setClusterUlid('');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occurred');
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
  <Select

        isRequired={true}
        label="Cluster Name"
        placeholder="choose a cluster"
        selectedKeys={[clusterUlid]}
        className="md"
        isInvalid={invalid}
        errorMessage="You must select a cluster"
        onChange={(e) => setClusterUlid(e.target.value)}
      >
        {availableClusters.map((cluster: any) => (
          <SelectItem key={cluster.cluster_ulid} value={cluster.cluster_ulid}>
            {cluster.cluster_name}
          </SelectItem>
        ))}
      </Select>
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
