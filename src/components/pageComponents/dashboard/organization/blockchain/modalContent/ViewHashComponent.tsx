import React from "react";
import {CertificateInfoType} from "@/types/issuedCertificateInfo.types";
import {Input} from "@nextui-org/react";

import { RiFileTextFill, RiUserFill, RiMailFill, RiCalendar2Fill, RiBookmarkFill, RiBuildingFill, RiShieldCheckFill, RiCloseCircleFill, RiTimeFill } from "react-icons/ri";



interface ViewHashComponentProps {
    info: CertificateInfoType | null
}


const ViewHashComponent: React.FC<ViewHashComponentProps> = ({ info }) => {
    if (!info) return <div className="text-center text-gray-700 dark:text-gray-300 text-sm">No Data Found</div>;

    const getStatus = () => {
        if (info.revoked) {
            return { label: "Revoked", color: "text-red-600", icon: <RiCloseCircleFill size={20} className="text-red-500" /> };
        }
        if (info.expiryDate && new Date(info.expiryDate) < new Date()) {
            return { label: "Expired", color: "text-orange-600", icon: <RiTimeFill size={20} className="text-orange-500" /> };
        }
        return info.status === "publicVerified"
            ? { label: "Public Verified", color: "text-green-600", icon: <RiShieldCheckFill size={20} className="text-green-500" /> }
            : { label: "Private Verified", color: "text-blue-600", icon: <RiShieldCheckFill size={20} className="text-yellow-500" /> };
    };

    const status = getStatus();

    return (
        <div className="p-5 bg-gray-100 dark:bg-zinc-900 rounded-lg shadow-md">
            <div className="space-y-5">
                {[
                    {
                        label: "Certificate Status",
                        value: status.label,
                        icon: status.icon,
                        className: `${status.color} font-medium`
                    },
                    {
                        label: "Certificate Name",
                        value: info.certificateName,
                        icon: <RiFileTextFill size={20} className="text-gray-600 dark:text-gray-400" />,
                    },
                    {
                        label: "Recipient Name",
                        value: info.recipientName,
                        icon: <RiUserFill size={20} className="text-gray-600 dark:text-gray-400" />,
                    },
                    {
                        label: "Recipient Email",
                        value: info.recipientEmail,
                        icon: <RiMailFill size={20} className="text-gray-600 dark:text-gray-400" />,
                    },
                    {
                        label: "Issuer Name",
                        value: info.issuerName,
                        icon: <RiBuildingFill size={20} className="text-gray-600 dark:text-gray-400" />,
                    },
                    {
                        label: "Issued Date",
                        value: info.issuedDate ? new Date(info.issuedDate).toLocaleDateString() : "N/A",
                        icon: <RiCalendar2Fill size={20} className="text-gray-600 dark:text-gray-400" />,
                    },
                    { label: "Cluster Name", value: info.clusterName, icon: <RiBuildingFill size={22} className="text-gray-600 dark:text-gray-400" /> },
                    { label: "Event Name", value: info.eventName, icon: <RiBookmarkFill size={22} className="text-gray-600 dark:text-gray-400" /> },
                ].map(({ label, value, icon, className }, index) => (
                    <div key={index} className="flex items-start w-full gap-3">
                        {icon}
                        <div className="flex flex-col w-full">
                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{label}</p>
                            <Input
                                value={value}
                                disabled
                                color={
                                    label === "Certificate Status"
                                        ? (value === "Public Verified"
                                            ? "success"
                                            : value === "Private Verified"
                                                ? "warning"
                                                : value === "Revoked" || value === "Expired"
                                                    ? "danger"
                                                    : "default")
                                        : "default"
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewHashComponent;
