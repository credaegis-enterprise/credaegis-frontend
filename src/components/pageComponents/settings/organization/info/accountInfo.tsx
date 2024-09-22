import { MdPersonOutline, MdUpload } from 'react-icons/md';
import { Input } from '@nextui-org/react';
import { SettingsType } from '@/types/global.types';
import { MyButton } from '@/components/buttons/mybutton';


interface AccountInfoProps {
    settings: SettingsType;
    accountType: string;
}

const AccountInfo: React.FC<AccountInfoProps> = ({settings,accountType}) => {
  return (
    <div className="flex flex-col h-full w-full p-4">
      <div className="flex justify-start items-center mb-4">
        <MdPersonOutline size={30} className="mr-2" />
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <div className="flex border border-gray-200 dark:border-stone-800 rounded-lg">
        <div className="relative flex-shrink-0 w-1/3 flex items-center justify-center p-4">
       
          <div className=" bg-gray-200 dark:bg-stone-800 rounded-full flex items-center justify-center">
            {accountType === "organization" && (
            <MdUpload size={36} className="absolute bottom-2 right-2 text-gray-500 cursor-pointer hover:text-gray-700" />
        )}
          </div>
        </div>
        <div className="flex flex-col w-2/3 p-4 gap-2">
        

          {accountType === "organization" && (
            <>
            <Input type="text" label="Organization Name" size="md" value={settings.organizationAccountInfo?.organization_name} />
            <Input type="text" label="Registered email" size="md" value={settings.organizationAccountInfo?.organization_email} />
            <div className='flex gap-2 justify-end'>
            <MyButton className="bg-black dark:bg-white" size="sm">
              <span className="dark:text-black text-white text-md font-medium">
                Edit
              </span>
            </MyButton>
            </div>
            </>
        )}
         
          {accountType=== "member" && (
            <>
            
            <Input type="text" label="Organization Name" size="md" value={settings.memberAccountInfo?.member_name} />
            <Input type="text" label="User Name" size="md" value={settings.memberAccountInfo?.member_name} />
            <Input type="text" label="Cluster Name" size="md" value={settings.memberAccountInfo?.cluster_name} />
            <Input type="text" label="Registered email" size="md" value={settings.memberAccountInfo?.member_email} />
            
            </>
        )}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;