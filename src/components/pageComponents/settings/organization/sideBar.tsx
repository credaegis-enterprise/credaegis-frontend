'use client'

import { FaCogs, FaLock, FaSlidersH } from "react-icons/fa";
import { useTabContext } from "@/context/tabContext";
import { MdPerson } from "react-icons/md";
const SideBar = () => {
  const { settingsTab,setSettingsTab } = useTabContext();
  console.log(settingsTab.id);

  
  return (
    <div className="flex flex-col gap-3">
      <div
        className={`flex items-center  rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer ${
          settingsTab.id === "Account" ? "bg-gray-300 dark:bg-stone-700" : ""
        }`}
        onClick={() => setSettingsTab({ type: "settings", id: "Account" })}
      >
        <MdPerson size={22} className="mr-3 text-gray-600 dark:text-gray-400" />
        <h3 className="text-md font-semibold">Account Information</h3>
      </div>
      <div
        className={`flex items-center  rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer ${
          settingsTab.id === "Security" ? "bg-gray-300 dark:bg-stone-700" : ""
        }`}
        onClick={() => setSettingsTab({ type: "settings", id: "Security" })}
      >
        <FaLock size={22} className="mr-3 text-gray-600 dark:text-gray-400" />
        <h3 className="text-md font-semibold">Security</h3>
      </div>
      {/* <div
        className={`flex items-center  rounded-lg shadow-sm p-4 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer ${
          settingsTab.id === "Preferences" ? "bg-gray-300 dark:bg-stone-700" : ""
        }`}
        onClick={() => setSettingsTab({ type: "settings", id: "Preferences" })}
      >
        <FaSlidersH
          size={22}
          className="mr-3 text-gray-600 dark:text-gray-400"
        />
        <h3 className="text-md font-semibold">Preferences</h3>
      </div> */}
    </div>
  );
};

export default SideBar;
