'use client';

import React, { createContext, useState,useContext, ReactNode } from 'react';


type tabDisplay = {
    type: string;
    id: string;
}

interface TabContextType {
  selectedTab: tabDisplay;
  setSelectedTab: (tab: tabDisplay) => void;
  settingsTab: tabDisplay;
  setSettingsTab: (tab: tabDisplay) => void;
}


const tabContext = createContext<TabContextType | undefined>(undefined);

export const useTabContext = () => {
  const context = useContext(tabContext);
  if (context === undefined) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};


export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState<tabDisplay>({ type: '', id: '' });
    const [settingsTab, setSettingsTab] = useState<tabDisplay>({ type: 'settings', id: 'Security' });

  return (
    <tabContext.Provider value={{ selectedTab, setSelectedTab,settingsTab,setSettingsTab }}>
      {children}
    </tabContext.Provider>
  );
};
