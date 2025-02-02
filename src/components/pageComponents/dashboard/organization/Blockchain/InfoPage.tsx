import {
  MdCircle,
  MdInfo,
  MdOutlineBatchPrediction,
  MdCheckCircle,
} from "react-icons/md";
import { FaNetworkWired, FaServer } from "react-icons/fa";

import Web3InfoType from "@/types/web3info.types";

interface InfoPageProps {
  web3Info: Web3InfoType;
}


const InfoPage: React.FC<InfoPageProps> = ({ web3Info }) =>{
  

  return (
    <div className="h-full rounded-lg shadow-sm p-6 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Connected Status */}
        <div className="p-6 border dark:border-stone-800 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <MdCheckCircle size={24} className="text-green-500" />
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
              Connected
            </h2>
          </div>
  
 
            <div className="flex flex-col gap-3">
              {/* Network ID */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                  Network Id
                </span>
                <div className="px-2 py-1 bg-gray-200 dark:bg-stone-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm">
                  {web3Info.web3Info.networkId}
                </div>
              </div>
  
              {/* Client Version */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                  Client Version
                </span>
                <div className="px-2 py-1 bg-gray-200 dark:bg-stone-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm">
                  {web3Info.web3Info.clientVersion}
                </div>
              </div>
            </div>
          </div>
   
  

        <div className="p-6 border dark:border-stone-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">Placeholder for additional content</span>
        </div>
      </div>
    </div>
  );
  
};

export default InfoPage;
