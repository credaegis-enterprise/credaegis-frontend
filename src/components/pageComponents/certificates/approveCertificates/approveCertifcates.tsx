import { MyButton } from "@/components/buttons/mybutton";
import { Checkbox } from "@nextui-org/react";
import ApprovalControl from "./approvalControl";
import { EventType,ClusterType } from "@/types/global.types";
import { useState } from "react";


interface ApproveCertificatesProps {
    eventInfo: EventType[];
    clusterInfo: ClusterType[];
    }

const ApproveCertificates: React.FC<ApproveCertificatesProps> = ({ eventInfo,clusterInfo }) => {

  const [approvalsList, setApprovalsList] = useState("");
  const certificates = [
    {
      eventName: "Tech Conference 2024 ",
      issuedTo: "John Does",
      uploadedBy: "Admin",
      expiry: "2025-01-01",
      comments: "My certificate",
    },
    {
      eventName: "Tech Conference 2024",
      issuedTo: "John Doe",
      uploadedBy: "Admin",
      expiry: "2025-01-01",
      comments: "Pending review",
    },
    {
        eventName: "Tech Conference 2024 ",
        issuedTo: "John Does",
        uploadedBy: "Admin",
        expiry: "2025-01-01",
        comments: "My certificate",
      },
      {
        eventName: "Tech Conference 2024",
        issuedTo: "John Doe",
        uploadedBy: "Admin",
        expiry: "2025-01-01",
        comments: "Pending review",
      },
      {
        eventName: "Tech Conference 2024 ",
        issuedTo: "John Does",
        uploadedBy: "Admin",
        expiry: "2025-01-01",
        comments: "My certificate",
      },
      {
        eventName: "Tech Conference 2024",
        issuedTo: "John Doe",
        uploadedBy: "Admin",
        expiry: "2025-01-01",
        comments: "Pending review",
      },
      {
        eventName: "Tech Conference 2024 ",
        issuedTo: "John Does",
        uploadedBy: "Admin",
        expiry: "2025-01-01",
        comments: "My certificate",
      },
      {
        eventName: "Tech Conference 2024",
        issuedTo: "John Doe",
        uploadedBy: "Admin",
        expiry: "2025-01-01",
        comments: "Pending review",
      },
      {
        eventName: "Tech Conference 2024 ",
        issuedTo: "John Does",
        uploadedBy: "Admin",
        expiry: "2025-01-01",
        comments: "My certificate",
      },
      {
        eventName: "Tech Conference 2024",
        issuedTo: "John Doe",
        uploadedBy: "Admin",
        expiry: "2025-01-01",
        comments: "Pending review",
      },
      {
        eventName: "Tech Conference 2024 ",
        issuedTo: "John Does",
        uploadedBy: "Admin",
        expiry: "2025-01-01",
        comments: "My certificate",
      },
      {
        eventName: "Tech Conference 2024",
        issuedTo: "John Doe",
        uploadedBy: "Admin",
        expiry: "2025-01-01",
        comments: "Pending review",
      },
      {
        eventName: "Tech Conference 2024 ",
        issuedTo: "John Does",
        uploadedBy: "Admin",
        expiry: "2025-01-01",
        comments: "My certificate",
      },
      {
        eventName: "Tech Conference 2024",
        issuedTo: "John Doe",
        uploadedBy: "Admin",
        expiry: "2025-01-01",
        comments: "Pending review",
      },
      
  ];

  return (
    <div className="h-full flex flex-col">
     <ApprovalControl eventInfo={eventInfo} clusterInfo={clusterInfo} />
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border dark:border-neutral-800">
      <table className="w-full text-sm text-left">
        <thead className="text-md bg-neutral-100 dark:bg-neutral-800 rounded-t-lg sticky z-30 top-0">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              Event Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              Issued To
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              Uploaded By
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              Expiry
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
            >
              Comments
            </th>
            <th scope="col" className="px-6 py-3 text-center w-12"></th>
          </tr>
        </thead>
        <tbody className="">
          {certificates.map((certificate, index) => (
            <tr key={index} className="">
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                {certificate.eventName}
              </td>
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                {certificate.issuedTo}
              </td>
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                {certificate.uploadedBy}
              </td>
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                {certificate.expiry}
              </td>
              <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                {certificate.comments}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-4">
                <MyButton size="sm" className="bg-black dark:bg-white">
                    <span className="dark:text-black text-white text-md font-medium">
                        View
                    </span>
                </MyButton>
                <Checkbox className="form-checkbox text-neutral-600 dark:text-neutral-300" color="success" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ApproveCertificates;
