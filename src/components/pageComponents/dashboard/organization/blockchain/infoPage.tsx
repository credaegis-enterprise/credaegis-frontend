import {
    MdCircle,
    MdInfo,
    MdOutlineBatchPrediction,
    MdCheckCircle,
} from "react-icons/md";
import { FaNetworkWired, FaServer } from "react-icons/fa";

import Web3InfoType from "@/types/web3info.types";
import { MyButton } from "@/components/buttons/mybutton";
import {Inconsolata, Roboto_Mono} from "next/font/google";
import React, {useState} from "react";
import MyModal from "@/components/modals/mymodal";
import NotifBoxMember from "@/components/notification/notifBoxMember";

interface InfoPageProps {
    web3Info: Web3InfoType;
}

const robotoMono = Roboto_Mono({ subsets: ["latin"] });
const inconsolata = Inconsolata({ subsets: ["latin"] });

const InfoPage: React.FC<InfoPageProps> = ({ web3Info }) => {
    const { batchId, hashes, merkleRoot, batchInfo } = {
        batchId: "1",
        hashes: ["hash1", "hash2", "hash3"],
        merkleRoot: "root",
        batchInfo: { hashCount: 3, txnHash: "hash", txnFee: 0.1, pushStatus: true }
    };
    const [isOpen, SetIsOpen] = useState<boolean>(false);

    return (
        <div className="h-screen flex flex-col p-6 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border dark:border-stone-800 rounded-lg h-1/2">
                {/* Connected Info */}
                <div className="p-4 overflow-auto">


                    <div className="flex flex-col gap-1 bg-gray-100 dark:bg-zinc-900 rounded-lg p-2">
                        <div className="flex items-center gap-4 mb-4">
                            <MdCheckCircle size={24} className="text-green-500"/>
                            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Connected</h2>
                        </div>
                        {[
                            {label: "Network Id", value: web3Info.web3Info.networkId},
                            {label: "Client Version", value: web3Info.web3Info.clientVersion},
                            {label: "Available Balance", value: `${web3Info.web3Info.balance} AVAX`}
                        ].map(({label, value}, index) => (
                            <div key={index} className="flex flex-wrap items-center justify-between gap-1">
                                <p className="text-sm  text-gray-700 dark:text-gray-300">{label}</p>
                                <div
                                    className={`${robotoMono.className} px-1 py-1 text-sm bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm`}>
                                    {value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Current Batch Info */}
                <div className="p-4 overflow-auto">

                    <div className="flex flex-col bg-gray-100 p-2 gap-1 rounded-lg dark:bg-zinc-900">
                        <div className="flex items-center gap-4 mb-2">
                            <MdInfo size={24} className="text-blue-500"/>
                            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Current Batch</h2>
                        </div>
                        {[
                            {label: "Batch Index", value: web3Info.currentBatchInfo.batchId},
                            {label: "Count", value: web3Info.currentBatchInfo.hashes.length}
                        ].map(({label, value}, index) => (
                            <div key={index} className="flex flex-wrap items-center justify-between gap-3">
                                <span className="text-sm  text-gray-700 dark:text-gray-300">{label}</span>
                                <div
                                    className="px-2 py-1 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm">
                                    {value}
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end gap-3">
                            <MyButton onClick={() => SetIsOpen(true)} size="sm"
                                      className="bg-black text-white dark:text-black dark:bg-white">
                                View hashes
                            </MyButton>

                            <MyButton size="sm"
                                      className="bg-black text-white dark:text-black dark:bg-white">Push</MyButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Section */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 border dark:border-stone-800 rounded-lg mt-2 p-6 flex-grow overflow-hidden">
                {/* Batch Summary */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Batch Summary</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Batch ID: <span className="font-medium">{batchId}</span></p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Merkle Root: <span className="break-all font-medium">{merkleRoot}</span></p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Hash Count: <span className="font-medium">{batchInfo.hashCount}</span></p>
                </div>

                {/* Transaction Details */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Transaction Details</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Txn Hash: <span className="break-all font-medium">{batchInfo.txnHash}</span></p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Txn Fee: <span className="font-medium">{batchInfo.txnFee} ETH</span></p>
                    <p className={`text-sm font-medium mt-2 ${batchInfo.pushStatus ? 'text-green-600' : 'text-red-600'}`}>
                        Push Status: {batchInfo.pushStatus ? "Success" : "Failed"}
                    </p>
                </div>

                {/* Hashes List */}
                <div className="md:col-span-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Hashes</h2>
                    <div className="mt-2 space-y-2">
                        {hashes.map((hash, index) => (
                            <p key={index} className="text-sm text-gray-600 dark:text-gray-400 break-all p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                                {hash}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hash Modal */}
            {isOpen && (
                <MyModal

                    title="Hashes"
                    onClose={() => SetIsOpen(false)}
                    size="md"
                    isOpen={isOpen}
                    backdrop="opaque"
                    content={<div className="flex flex-col gap-4">
                        {web3Info.currentBatchInfo.hashes.map((hash, index) => (
                            <div key={index} className="flex items-start gap-4 w-full">
                                <span className="text-gray-500 font-medium">{index + 1}.</span>
                                <div
                                    className="flex flex-col gap-1 p-2 bg-gray-200 dark:bg-zinc-700 rounded-md shadow-sm w-full break-all">
                                    {hash}
                                </div>
                            </div>
                        ))}
                    </div>} button1={undefined} button2={undefined} onOpen={function (): void {
                    throw new Error("Function not implemented.");
                }}                />
            )}
        </div>
    );
};


export default InfoPage;