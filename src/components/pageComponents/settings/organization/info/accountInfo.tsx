import React from 'react';
import { MdClose, MdPersonOutline, MdUpload, MdWarning } from 'react-icons/md';
import { Input, Spinner } from '@nextui-org/react';
import { OrganizationSettingType } from '@/types/global.types';
import { MyButton } from '@/components/buttons/mybutton';
import { useState,useRef, useEffect } from 'react';
import MyModal from '@/components/modals/mymodal';
import { toast } from 'sonner';
import { myInstance } from '@/utils/Axios/axios';
import { set, toArray } from 'lodash';
import { useRouter } from 'next/navigation';
import { AccountInfoType } from '@/types/accountInfo.types';
import { url } from 'inspector';


interface AccountInfoProps {
  settings: AccountInfoType
}

const AccountInfo: React.FC<AccountInfoProps> = ({ settings }) => {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState<string>("");
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  useEffect(() => {

    fetchBrandLogo();
    setName(settings.organizationInfo.name);
    setUserName(settings.userInfo.username);
  }, [settings.organizationInfo.name]);




  const handleBrandLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    
    const file = toArray(e.target.files)[0];
    console.log(file);
    const formData = new FormData();
    formData.append("logo", file);

    try {
      const response = await myInstance.post("/organization/account/upload/brand-logo",formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      
      });
      toast.success(response.data.message);
      setError(false);
      router.refresh();
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }

    setIsLoading(false);
    router.refresh();
    if(inputRef.current){
      inputRef.current.value = "";
    }
  }


  const fetchBrandLogo = async () => {
    setIsLoading(true);
    setError(false); 
    try {
      const response = await myInstance.get("/organization/account/serve/brand-logo", {
        responseType: "arraybuffer", 
      });
      const blob = new Blob([response.data], { type: "image/png" }); 
      const objectUrl = URL.createObjectURL(blob); 
      setUrl(objectUrl); 
    } catch (err) {
      console.error("Error fetching brand logo:", err);
      setError(true); 
    } finally {
      setIsLoading(false); 
    }
  };


  const handleInfoUpdate = async () => {
    setIsLoading(true);
    setNameError(false);
    if(name === ""){
      setNameError(true);
      toast.error("Organization name cannot be empty");
      setIsLoading(false);
      return
    }
    if(userName === ""){
      setNameError(true);
      toast.error("User name cannot be empty");
      setIsLoading(false);
      return
    }
    try {
      const response = await myInstance.put("/organization/account/update-info", {
       organizationName: name,
        username: userName
      });
      toast.success(response.data.message);
      setIsEditing(!isEditing);
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
    router.refresh();
  }


  const handleDeleteLogo = async () => {
    setIsLoading(true);
    try {
      const response = await myInstance.delete("/organization/account/remove/brand-logo");
      toast.success(response.data.message);
      setError(true);
      setIsOpen(false);

    } catch (error: any) {

      console.log(error);
    }
    router.refresh();
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col h-full w-full p-8  rounded-lg shadow-lg">
  
      <div className="flex items-center mb-6">
        <MdPersonOutline size={30} className="mr-3 text-blue-400" />
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Profile</h1>
      </div>

 
      <div className="flex flex-col lg:flex-row border border-gray-300 dark:border-stone-800 rounded-xl overflow-hidden">
        <input type="file" ref={inputRef} className="hidden" onChange={(e) => handleBrandLogoUpload(e)} />
        <div className="relative lg:w-1/3 w-full flex items-center justify-center  p-6">
          

            {!isLoading ? (
            <img
              src={url}
              alt="Brand logo not found"
              className="w-48 h-48 object-cover rounded-full shadow-md"
              onError={() => setError(true)}
            />
          ) : (
            <div className=''>
            <Spinner size='lg' color='current' className='text-black dark:text-white'/>
            </div>
          )}
            


         {settings.userInfo.brandLogoEnabled?
           ( <MdClose
              size={30}
              className="absolute bottom-6 right-6 text-gray-600 dark:text-gray-400 cursor-pointer transition-colors hover:text-gray-900 dark:hover:text-red-400"
              onClick={() => setIsOpen(true)}
            />
           ):(
            <MdUpload
            size={30}
            className="absolute bottom-6 right-6 text-gray-600 dark:text-gray-400 cursor-pointer transition-colors hover:text-gray-900 dark:hover:text-blue-400"
            onClick={() => inputRef.current?.click()}
          />
           )
          }
          
        </div>

   
        <div className="flex flex-col lg:w-2/3 w-full p-6 space-y-4">

        <Input
            type="text"
            label="Username"
            isInvalid={nameError}
            errorMessage="User name cannot be empty"
            size="lg"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            readOnly={!isEditing}
            className="  "
          />

          <Input
            type="text"
            label="Organization Name"
            isInvalid={nameError}
            errorMessage="Organization name cannot be empty"
            size="lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={!isEditing}
            className="  "
          />


          <Input
            type="text"
            label="Registered Email"
            size="lg"
            value={settings.userInfo.email}
            readOnly

          />

        
          <div className="flex justify-end mt-4">
          {!isEditing ?( 

            <MyButton className='bg-black dark:bg-white text-white dark:text-black' size='sm'
            onClick={() => {
              setIsEditing(!isEditing);
              toast.info("Edit mode enabled");
            }}
            >
              Edit Info
            </MyButton>
          ) : (
            <div className='flex gap-3'>
            <MyButton spinner={<Spinner size='sm'/>} className='bg-black dark:bg-white text-white dark:text-black' size='sm'
            onClick={() => {
              handleInfoUpdate();
            
  
            }}
            >
              Save Changes
            </MyButton>
            <MyButton className='bg-black dark:bg-white text-white dark:text-black' size='sm'
            onClick={() => {
              setIsEditing(!isEditing);
              setName(settings.organizationInfo.name);
              toast.info("Edit mode disabled");
            }}
            >
              Cancel
            </MyButton>
            </div>
            
          )}

          </div>
        </div>
      </div>
      {isOpen && (
         <MyModal
         size="md"
         isOpen={isOpen}
         backdrop="blur"
         onClose={() => {
           setIsOpen(false);
         }}
         onOpen={() => {
           setIsOpen(true);
         }}
         title=""
         content={
          <div className='flex flex-col w-full'>
            <div className='text-xl font-semibold mb-4 text-center'>Are you sure?</div>
           <div className='flex items-center gap-2 mb-4'>
             <MdWarning size={26} className='text-yellow-400'/>
             <h1 className='text-md text-yellow-400 font-semibold'> This is an irreversible action. Logo will be lost forever.</h1>
             </div>
          </div>
         }
          button1={
            <MyButton
              color='danger'
              size="md"
             spinner={<Spinner size="sm" color="default" />}
              isLoading={isLoading}
              onClick={() => {
                handleDeleteLogo();
              }}
            >
      
              <span className=" dark:text-white text-md font-medium">
                delete
              </span>
            </MyButton>
            
          }

          button2={
            <MyButton
              className="bg-black dark:bg-white"
              size="md"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </MyButton>

          }
     
        />
      )}
         

    </div>
  );
};

export default AccountInfo;
