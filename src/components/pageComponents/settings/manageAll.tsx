'use client';
import Security from "./security";
import { useContext,useState,useEffect } from "react";
import { useTabContext } from "@/context/tabContext";

 type Settings = {
    setting_id: string;
    member_ulid: string | null;
    organization_ulid: string;
    account_type: 'member' | 'organization';
    two_fa_enabled: boolean; 
    created_at: string; 
    updated_at: string; 
  }


interface manageAllProps {
    settings: Settings;
}


const ManageAll: React.FC<manageAllProps> = ({settings}) => {


   const {settingsTab,setSettingsTab} = useTabContext();
    useEffect(() => {
       if(settingsTab.id===''){
              setSettingsTab({type:'settings',id:'Security'});
         }
    },[settingsTab]);

    return(
        <div className="h-full">
                        {settingsTab.id === 'General' && <p>General settings content goes here.</p>}
                        {settingsTab.id === 'Security' && <Security two_fa_enabled={settings.two_fa_enabled}/>}
                        {settingsTab.id === 'Preferences' && <p>Preferences settings content goes here.</p>}
      </div>
    )
}


export default ManageAll;
