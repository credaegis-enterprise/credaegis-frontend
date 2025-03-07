

import { MdSettings } from "react-icons/md";
import ManageAll from "@/components/pageComponents/settings/member/manageAll";
import SideBar from "@/components/pageComponents/settings/member/sideBar";
import { myInstanceNEXT } from "@/utils/Axios/axios";
import getCookies from "@/utils/cookies/getCookies";
import { AccountInfoType } from "@/types/accountInfo.types";


const fetchSettings = async () => {

    const cookies = getCookies("CREDAEGIS_SESSION");
    try {
        const response = await myInstanceNEXT.get("/member/account/me",{
            headers: {
                cookie:`CREDAEGIS_SESSION=${cookies}`
            }
        });
        return response.data.responseData as AccountInfoType;
    } catch (error: any) {
        console.log(error);
    }
}
const Page = async () => {

    const settings = await fetchSettings(); 
    console.log(settings);            
   
    return (
        <div className="p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300">
            <div className="grid grid-cols-8 h-full gap-4">
                <div className="lg:col-span-2 col-span-full h-full overflow-auto rounded-lg p-4 border border-gray-200 dark:border-stone-800">
                    <div className="flex items-center gap-3 mb-4">
                        <MdSettings size={28} />
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            Settings
                        </h2>
                    </div>
                    <SideBar />
                </div>
                <div className="lg:col-span-6 col-span-full overflow-auto p-4 h-full  rounded-lg border border-gray-200 dark:border-stone-800 ">
                {settings && <ManageAll settings={settings} /> }
                </div>
            </div>
        </div>
    );
};

export default Page;
