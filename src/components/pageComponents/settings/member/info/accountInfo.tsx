import React from 'react';
import {MdClose, MdPersonOutline, MdUpload, MdWarning} from 'react-icons/md';
import {Input, Spinner} from '@nextui-org/react';
import {MemberSettingType} from '@/types/global.types';
import {MyButton} from '@/components/buttons/mybutton';
import {useState, useRef, useEffect} from 'react';
import {MdPerson} from 'react-icons/md';
import {myInstance} from '@/utils/Axios/axios';
import {set, toArray} from 'lodash';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {AccountInfoType} from '@/types/accountInfo.types';


interface AccountInfoProps {
    settings: AccountInfoType;
}

const AccountInfo: React.FC<AccountInfoProps> = ({settings}) => {
    const router = useRouter();
    const [error, setError] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    useEffect(() => {
        fetchBrandLogo();
        setName(settings.userInfo.username);
    }, [settings.userInfo.username]);


    const fetchBrandLogo = async () => {
        setIsLoading(true);
        setError(false);
        try {
            const response = await myInstance.get("/member/account/serve/brand-logo", {
                responseType: "arraybuffer",
            });
            const blob = new Blob([response.data], {type: "image/png"});
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
        setNameError(false);

        if (!name) {
            setNameError(true);
            return;
        }


        setIsLoading(true);
        try {
            const response = await myInstance.put("/member/account/update-info", {
                username: name,
            });
            toast.success(response.data.message);
            setIsEditing(false);
        } catch (error: any) {
            toast.error(error.response?.data.message || "An error occurred");
            console.log(error);
        }

        setIsLoading(false);
        router.refresh();
    }


    return (
        <div className="flex flex-col h-full w-full p-8  rounded-lg shadow-lg">

            <div className="flex items-center mb-6">
                <MdPersonOutline size={30} className="mr-3 text-blue-400"/>
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Profile</h1>
            </div>


            <div
                className="flex flex-col lg:flex-row border border-gray-300 dark:border-stone-800 rounded-xl overflow-hidden">

                <div className="relative lg:w-1/3 w-full flex items-center justify-center  p-6">

                    <>
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
                    </>


                </div>


                <div className="flex flex-col lg:w-2/3 w-full p-6 space-y-4">


                    <Input
                        type="text"
                        label="Registered Under"
                        size="lg"
                        value={settings.userInfo.username}
                        isDisabled={isEditing}
                        readOnly

                    />

                    <Input
                        type="text"
                        label="your registered Email"
                        size="lg"
                        value={settings.userInfo.email}
                        isDisabled={isEditing}
                        readOnly
                    />

                    <Input
                        type="text"
                        label="Username"
                        size="lg"
                        value={name}
                        readOnly={!isEditing}
                        onChange={(e) => setName(e.target.value)}
                        isInvalid={nameError}
                        errorMessage="Username cannot be empty"
                    />

                    <div className="flex justify-end mt-4">
                        {!isEditing ? (

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
                                <MyButton spinner={<Spinner size='sm'/>}
                                          className='bg-black dark:bg-white text-white dark:text-black' size='sm'
                                          onClick={() => {
                                              handleInfoUpdate();


                                          }}
                                >
                                    Save Changes
                                </MyButton>
                                <MyButton className='bg-black dark:bg-white text-white dark:text-black' size='sm'
                                          onClick={() => {
                                              setIsEditing(!isEditing);
                                              setName(settings.userInfo.username);
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


        </div>
    );
};

export default AccountInfo;
