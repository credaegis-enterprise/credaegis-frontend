'use client';

import React, { createContext, useState,useContext, ReactNode } from 'react';


type authInfo = {
    role: string;
}

interface AuthContextType {
   selectedRole: authInfo;
    setSelectedRole: (role: authInfo) => void;
}


const authContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [selectedRole, setSelectedRole] = useState<authInfo>({ role: '' });

    return ( 
        <authContext.Provider value={{ selectedRole, setSelectedRole }}>
            {children}
        </authContext.Provider>
    );
};
