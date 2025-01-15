import { MdCircle, MdInfo, MdOutlineBatchPrediction,MdCheckCircle } from 'react-icons/md';
import { FaNetworkWired, FaServer } from 'react-icons/fa';

const InfoPage: React.FC = () => {
  const web3Info = {
    networkName: "Avalanche",
    networkId: "43113",
    clientVersion: "v0.14.1",
  };

  const currentBatchInfo = {
    batchId: "2",
    hashes: [],
    merkleRoot: "",
  };

  return (
    <div className="h-full rounded-lg shadow-sm p-6  overflow-auto">
      <div className="grid grid-rows-1 gap-6">

      <div className="p-6 border border-stone-800 rounded-lg shadow-md ">
  <div className="flex items-center gap-4 mb-4">
    <MdCheckCircle size={24} className="text-green-500" />
    <h2 className="text-xl font-medium text-gray-900 dark:text-white">Connected</h2>
  </div>
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <FaNetworkWired size={24} className="text-indigo-500" />
      <span className="text-gray-700 dark:text-gray-300 text-base">
        {web3Info.networkName}
      </span>
    </div>
    <div className="flex items-center gap-3">
      <MdInfo size={24} className="text-blue-500" />
      <span className="text-gray-700 dark:text-gray-300 text-base">
        <strong>Network ID: </strong>
        <em>{web3Info.networkId}</em>
      </span>
    </div>
    <div className="flex items-center gap-3">
      <FaServer size={24} className="text-green-500" />
      <span className="text-gray-700 dark:text-gray-300 text-base">
        <strong>Client Version: </strong>
        <em>{web3Info.clientVersion}</em>
      </span>
    </div>
  </div>
</div>


        {/* Current Batch Info */}
        
     
      </div>
    </div>
  );
};

export default InfoPage;
