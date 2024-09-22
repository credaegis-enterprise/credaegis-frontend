'use client';
import Security from "../info/security";
import {useEffect } from "react";
import { useTabContext } from "@/context/tabContext";
import AccountInfo from "../info/accountInfo";
import { SettingsType } from "@/types/global.types";



interface manageAllProps {
    settings: SettingsType;
     accountType: string;
}


const ManageAll: React.FC<manageAllProps> = ({settings,accountType}) => {
   const {settingsTab,setSettingsTab} = useTabContext();
   console.log(settings)

   
    useEffect(() => {
       if(settingsTab.id===''){
              setSettingsTab({type:'settings',id:'Security'});
         }
    },[settingsTab]);

    return(
        <div className="h-full">
                        {settingsTab.id === 'Account' && <AccountInfo settings={settings} accountType={accountType} />}
                        {settingsTab.id === 'Security' && <Security two_fa_enabled={settings.settingsInfo.two_fa_enabled}/>}
                        {settingsTab.id === 'Preferences' && <p>Preferences settings content goes here.</p>}
      </div>
    )
}


export default ManageAll;
