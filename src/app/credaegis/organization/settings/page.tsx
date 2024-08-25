'use client';

import { MdSettings } from "react-icons/md";
import { FaCogs, FaLock, FaSlidersH } from "react-icons/fa";
import Security from "@/components/pageComponents/settings/security";
import { useState } from "react";

const Page = () => {
    const [selectedView, setSelectedView] = useState<string>("Security");

    const handleClick = (view: string) => {
        setSelectedView(view);
    };

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
                    <div className="flex flex-col gap-3">
                        <div 
                            className={`flex items-center bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer ${selectedView === 'General' ? 'bg-gray-100 dark:bg-stone-700' : ''}`}
                            onClick={() => handleClick('General')}
                        >
                            <FaCogs size={22} className="mr-3 text-gray-600 dark:text-gray-400" />
                            <h3 className="text-md font-semibold">General</h3>
                        </div>
                        <div 
                            className={`flex items-center bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer ${selectedView === 'Security' ? 'bg-gray-100 dark:bg-stone-700' : ''}`}
                            onClick={() => handleClick('Security')}
                        >
                            <FaLock size={22} className="mr-3 text-gray-600 dark:text-gray-400" />
                            <h3 className="text-md font-semibold">Security</h3>
                        </div>
                        <div 
                            className={`flex items-center bg-white dark:bg-stone-900 rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer ${selectedView === 'Preferences' ? 'bg-gray-100 dark:bg-stone-700' : ''}`}
                            onClick={() => handleClick('Preferences')}
                        >
                            <FaSlidersH size={22} className="mr-3 text-gray-600 dark:text-gray-400" />
                            <h3 className="text-md font-semibold">Preferences</h3>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-6 col-span-full overflow-auto p-4 h-full  rounded-lg border border-gray-200 dark:border-stone-800 ">
                    <div className="h-full">
                        {selectedView === 'General' && <p>General settings content goes here.</p>}
                        {selectedView === 'Security' && <Security />}
                        {selectedView === 'Preferences' && <p>Preferences settings content goes here.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
