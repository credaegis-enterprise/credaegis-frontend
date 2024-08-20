'use client'



import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Button, Input } from '@nextui-org/react';
import { MyButton } from '@/components/buttons/mybutton';
import emailValidator from '@/utils/Validators/emailValidator';
import { myInstance } from '@/utils/Axios/axios';
import { toast } from 'sonner';
import { Spinner } from '@nextui-org/react';

const CreateCluster = () => {
  const [clusterName, setClusterName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const handleclusterCreate =  async() => {

    setIsLoading(true);
    console.log(clusterName, adminName, adminEmail);
    if (clusterName === '' || adminName === '' || adminEmail === '') {
        setIsLoading(false);
      toast.error('Please fill all the fields');
      return;
    }

    if (!emailValidator(adminEmail)) {
        setIsLoading(false);
        setIsValidEmail(false);
        toast.error('Please enter a valid email');
      return;
    }

    try {
      const response = await myInstance.post('/cluster/create', {
        cluster_name: clusterName,
        member_name: adminName,
        member_email: adminEmail,
      });

      toast.success(response.data.message);
      setClusterName('');
      setAdminName('');
      setAdminEmail('');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occurred');
    }   
    setIsLoading(false);


  }


  return (
    <div className="w-full ">
        

        <div className='flex flex-col  gap-4 '>
      
     
          
          <Input
            type="text"
            label="Cluster Name"
            size='md'
            value={clusterName}
            onChange={(e) => setClusterName(e.target.value)}
          />
            <Input
            type="text"
            label="Admin Name"
            size='md'
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
            <Input
            type="email"
            label="Admin Email"
            size='md'
            value={adminEmail}
            isInvalid={!isValidEmail}
            errorMessage="Please enter a valid email"
            onChange={(e) => setAdminEmail(e.target.value)}
            />
      
      
            <MyButton 
            className="bg-black dark:bg-white"
            size="md"
            spinner={<Spinner size="sm" color="default" />}
            isLoading={isLoading}
            onClick={() => {handleclusterCreate();}}
            >
            <span className="dark:text-black text-white text-md font-medium">
              Create Cluster
            </span>
            </MyButton>

        </div>
    </div>
  );
};

export default CreateCluster;
