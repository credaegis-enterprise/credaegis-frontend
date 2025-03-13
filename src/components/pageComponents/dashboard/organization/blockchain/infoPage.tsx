import {
    MdCircle,
    MdInfo,
    MdOutlineBatchPrediction,
    MdCheckCircle, MdWarning, MdRefresh,
} from "react-icons/md";


import Web3InfoType from "@/types/web3info.types";
import {MyButton} from "@/components/buttons/mybutton";
import {Inconsolata, Roboto_Mono} from "next/font/google";
import React, {useEffect, useState} from "react";
import MyModal from "@/components/modals/mymodal";
import NotifBoxMember from "@/components/notification/notifBoxMember";
import {Checkbox, Input, Spinner} from "@nextui-org/react";
import {BatchInfoType} from "@/types/batchInfo.types";
import {useRouter} from "next/navigation";
import {myInstance} from "@/utils/Axios/axios";
import {
    RiShieldKeyholeFill,
    RiHashtag,
    RiFileList2Fill,
    RiCheckboxCircleFill,
    RiCloseCircleFill,
    RiMoneyDollarCircleFill, RiTimeFill
} from "react-icons/ri";
import {toast} from "sonner";
import {IoMdClock, IoMdLink} from "react-icons/io";
import ViewHashComponent
    from "@/components/pageComponents/dashboard/organization/blockchain/modalContent/ViewHashComponent";
import {CertificateInfoType} from "@/types/issuedCertificateInfo.types";


interface InfoPageProps {
    web3Info: Web3InfoType;
    batchInfo: BatchInfoType
}

const robotoMono = Roboto_Mono({subsets: ["latin"]});
const inconsolata = Inconsolata({subsets: ["latin"]});

const InfoPage: React.FC<InfoPageProps> = ({web3Info, batchInfo}) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [batchInfoDisp, setBatchInfoDisp] = useState<BatchInfoType | null>(null);
    const [searchBatchId, setSearchBatchId] = useState<string>(web3Info.currentBatchInfo.batchId);
    const [openPushWarning, setOpenPushWarning] = useState<boolean>(false);
    const [pushLoading, setPushLoading] = useState<boolean>(false);
    const [certificateInfo,setCertificateInfo] =  useState<CertificateInfoType|null>(null)
    const [viewHashLoader,setViewHashLoader] = useState<boolean>(false);
    const [batchSearchLoader,setBatchSearchLoader] = useState<Boolean>(false);


    useEffect(() => {
        setSearchBatchId(web3Info.currentBatchInfo.batchId);
        setBatchInfoDisp(batchInfo);

    }, [batchInfo]);


    const handleBatchSearchSelection = (value: string) => {
        if (value === "" || /^\d+$/.test(value)) {
            setSearchBatchId(value);
        }
    };


    const initiatePush = async () => {

        setPushLoading(true);
        try {
            const response = await myInstance.post(
                `/organization/web3/public/store/current/merkle-root`,
            );
            toast.success(response.data.message);
        } catch (error: any) {
            console.log(error);
        }

        router.refresh();
        setPushLoading(false);

    }


    const fetchBatchInfo = async () => {
        setBatchSearchLoader(true);
        try {
            const response = await myInstance.get(`/organization/web3/private/batch/${searchBatchId}`);
            setBatchInfoDisp(response.data.responseData);
        } catch (error: any) {
            console.log(error);
        }
        setBatchSearchLoader(false);

    }


    const fetchCertificateInfo =  async (hash:String)=>{
        setViewHashLoader(true);
        setIsOpen(true);
        try {

            const response = await myInstance.get(`/organization/certificate-control/${hash}`);
            setCertificateInfo(response.data.responseData);
        }
        catch (error: any) {
            console.log(error);
        }
        setViewHashLoader(false);

    }


    return (
        <div className="h-screen overflow-auto flex flex-col p-6 ">

            {pushLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-200 dark:bg-stone-800 p-6 rounded-lg shadow-lg flex items-center space-x-4">
                        <Spinner size="lg" color="current" className="text-black dark:text-white"/>
                        <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Please wait, your request is being processed.
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border dark:border-stone-800 rounded-lg ">
                {/* Connected Info */}
                <div className="p-4 overflow-auto">


                    <div className="flex flex-col gap-1 bg-gray-100 dark:bg-zinc-900 rounded-lg p-2">
                        <div className="flex items-center gap-4 mb-4">
                            <MdCheckCircle size={24} className="text-green-500"/>
                            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Connected</h2>
                        </div>
                        {[
                            {label: "chain Id", value: web3Info.web3Info.networkId},
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

                            <MyButton
                                isDisabled={web3Info?.currentBatchInfo?.hashes.length === 0}
                                onClick={() => {
                                    setOpenPushWarning(true)
                                }}
                                size="sm"
                                className="bg-black text-white dark:text-black dark:bg-white">Push</MyButton>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col border dark:border-stone-800 rounded-lg mt-2 p-6 gap-6">
                {/* Batch Search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Batch Information
                    </h2>
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Enter batch ID"
                            size="sm"
                            value={searchBatchId}
                            onChange={(e) => handleBatchSearchSelection(e.target.value)}
                        />
                        <MyButton
                            onClick={() => fetchBatchInfo()}
                            size="sm"
                            className="bg-black text-white dark:text-black dark:bg-white h-7"
                        >
                            Search
                        </MyButton>
                    </div>
                </div>

                {/* Loading State */}
                {batchSearchLoader ? (
                    <div className="flex justify-center items-center w-full min-h-[200px]">
                        <Spinner size="md" color="current"/>
                    </div>
                ) : (
                    <>
                    {!batchInfoDisp?.isCurrentBatch && (
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Summary Section */}
                            <div className="flex-1 p-5 bg-gray-100 dark:bg-zinc-900 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
                                    <RiFileList2Fill className="w-6 h-6 text-gray-700 dark:text-gray-300"/> Summary
                                </h2>
                                <hr/>
                                <div className="space-y-3 mt-4">
                                    {[
                                        {
                                            label: "Merkle Root",
                                            value: batchInfoDisp?.batchInfo?.merkleRoot,
                                            icon: <RiShieldKeyholeFill size={32} className="text-gray-600 dark:text-gray-300"/>,
                                            className: "break-all text-sm bg-gray-200 dark:bg-zinc-700 flex-1"
                                        },
                                        {
                                            label: "Push Status",
                                            value: batchInfoDisp?.batchInfo?.pushStatus ? "Success" : "Failed",
                                            icon: batchInfoDisp?.batchInfo?.pushStatus ? (
                                                <RiCheckboxCircleFill size={24} className="text-green-500"/>
                                            ) : (
                                                <RiCloseCircleFill size={24} className="text-red-500"/>
                                            ),
                                            className: batchInfoDisp?.batchInfo?.pushStatus
                                                ? "bg-green-200 dark:bg-green-400 dark:text-black"
                                                : "bg-red-200 dark:bg-red-400 dark:text-black",
                                        },
                                        {
                                            label: "Push Time",
                                            value: batchInfoDisp?.batchInfo.pushStatus ? batchInfoDisp?.batchInfo.pushTime : "N/A",
                                            icon: <RiTimeFill size={24} className="text-gray-600 dark:text-gray-300"/>,
                                            className: "px-2 py-1 bg-gray-200 dark:bg-zinc-700 flex-1"
                                        }
                                    ].map(({ label, value, icon, className }, index) => (
                                        <div key={index} className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 w-[120px]">
                                                {icon}
                                                <p className="text-sm text-gray-700 dark:text-gray-300">{label}</p>
                                            </div>

                                            <div className={`px-3 py-1 rounded-md shadow-sm text-right ${className} ${robotoMono.className}`}>
                                                {value}
                                            </div>
                                            {label === "Push Status" && value === "Failed" && (
                                                <MyButton
                                                    size="xs"
                                                    className=" h-7 text-sm font-medium bg-black text-white dark:text-black dark:bg-white rounded-md shadow-sm flex items-center gap-1"
                                                    onClick={() => {
                                                        // handlePushAgain();
                                                    }}
                                                >
                                                    <MdRefresh size={15}/>
                                                    Retry
                                                </MyButton>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>



                                {/* Transaction Details Section */}
                                <div className="flex-1 p-5 bg-gray-100 dark:bg-zinc-900 rounded-lg shadow-md">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
                                        <RiFileList2Fill className="w-6 h-6 text-gray-700 dark:text-gray-300"/> Transaction Details
                                    </h2>
                                    <hr/>

                                    {batchInfoDisp?.batchInfo?.pushStatus ? (
                                        <div className="space-y-3 mt-4">
                                            {[
                                                {
                                                    label: "Txn Hash",
                                                    value: batchInfoDisp?.batchInfo?.txnHash || "N/A",
                                                    icon: <RiHashtag size={22} className="text-gray-600 dark:text-gray-400"/>,
                                                    className: `break-all text-sm bg-gray-200 dark:bg-zinc-700 ${robotoMono.className} flex-1`
                                                },
                                                {
                                                    label: "Txn Fee",
                                                    value: `${batchInfoDisp?.batchInfo?.txnFee} AVAX` || "N/A",
                                                    icon: <RiMoneyDollarCircleFill size={22} className="text-gray-600 dark:text-gray-400"/>,
                                                    className: `px-3 py-1 bg-gray-200 dark:bg-zinc-700 rounded-md shadow-sm ${robotoMono.className} flex-1`
                                                },
                                                {
                                                    label: "Txn URL",
                                                    icon: <IoMdLink size={22} className="text-gray-600 dark:text-gray-400"/>,
                                                    className: "py-1 text-sm rounded-md shadow-sm flex-1",
                                                    value: (
                                                        <MyButton
                                                            size="xs"
                                                            className="bg-black text-white dark:text-black dark:bg-white"
                                                            onClick={() => {
                                                                window.open(batchInfoDisp?.batchInfo?.txnUrl, "_blank");
                                                            }}
                                                        >
                                                            Visit
                                                        </MyButton>
                                                    )
                                                }
                                            ].map(({ label, value, icon, className }, index) => (
                                                <div key={index} className="flex items-center justify-between gap-4">
                                                    {/* Label Section */}
                                                    <div className="flex items-center gap-3 w-[120px]">
                                                        {icon}
                                                        <p className="text-sm text-gray-700 dark:text-gray-300">{label}</p>
                                                    </div>

                                                    {/* Value Section */}
                                                    <div className={`px-3 py-1 rounded-md shadow-sm text-right ${className}`}>
                                                        {value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex justify-center items-center gap-2 text-gray-500 mt-12">
                                            No transaction details available, please push the batch to get the transaction details.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* Hashes Section */}
                        <div className="p-4 bg-gray-100 dark:bg-zinc-900 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                Hashes
                                <span
                                    className="flex items-center justify-center w-6 h-6 text-sm font-medium text-white bg-gray-500 dark:bg-zinc-700 rounded-full">
                        {batchInfoDisp?.hashes.length ?? 0}
                    </span>
                            </h2>
                            <div className="mt-2 space-y-2 p-2 overflow-auto h-60">
                                {batchInfoDisp?.hashes?.length || 0 ? (
                                    batchInfoDisp?.hashes.map((hash, index) => (
                                        <div key={index}
                                             className="flex items-center gap-3 break-all p-2 bg-gray-200 dark:bg-zinc-700 rounded-lg">
                                            <span
                                                className="text-gray-600 dark:text-gray-300 font-medium">{index + 1}.</span>
                                            <p className={`${robotoMono.className} w-full`}>{hash}</p>
                                            <MyButton size="xs"
                                                      className="bg-black text-white dark:text-black dark:bg-white"
                                                      onClick={() => fetchCertificateInfo(hash)}>
                                                View
                                            </MyButton>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex justify-center items-center text-gray-500 mt-12">No hashes
                                        added to the batch</div>
                                )}
                            </div>
                        </div>
                    </>
                )}


            {openPushWarning && (
                <MyModal

                    title="Hashes"
                    onClose={() => setOpenPushWarning(false)}
                    size="md"
                    isOpen={openPushWarning}
                    backdrop="opaque"
                    content={
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <MdWarning size={60} className="text-yellow-500"/>
                                <div className="text-lg font-semibold text-yellow-500">
                                    Are you sure to finalize this batch, this is irreversible.
                                </div>
                            </div>
                            <div className={`flex justify-center gap-3`}>
                                <MyButton
                                    color="warning"
                                    size="sm"
                                    spinner={<Spinner size="sm" color="current"/>}
                                    isLoading={pushLoading}
                                    onClick={() => {
                                        setOpenPushWarning(false);
                                        initiatePush();
                                    }}
                                >
                                    push
                                </MyButton>
                                <MyButton
                                    size="sm"
                                    className="bg-black text-white dark:text-black dark:bg-white"
                                    onClick={() => {
                                        setOpenPushWarning(false);
                                    }}
                                >
                                    Cancel
                                </MyButton>
                            </div>


                        </div>
                    } button1={undefined} button2={undefined} onOpen={function (): void {
                    throw new Error("Function not implemented.");
                }}/>

            )}


            <>
                {isOpen && (
                    <MyModal

                        title="Hash Information"
                        onClose={() => setIsOpen(false)}
                        size="md"
                        isOpen={isOpen}
                        backdrop="opaque"
                        content={
                            <>
                                {viewHashLoader ? (
                                    <div className="flex items-center justify-center">
                                        <Spinner size="lg" color="current" className="text-black dark:text-white"/>
                                    </div>
                                ) : (
                                    <ViewHashComponent info={certificateInfo}/>
                                )}
                            </>
                        }

                        button1={undefined} button2={undefined} onOpen={function (): void {
                        throw new Error("Function not implemented.");
                    }}/>
                )}
            </>
        </div>
</div>

)
    ;
};


export default InfoPage;