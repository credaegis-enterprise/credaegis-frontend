import { MyButton } from "@/components/buttons/mybutton";
import { Checkbox } from "@nextui-org/react";
import { EventType, ClusterType } from "@/types/global.types";
import { useCallback, useState } from "react";
import { ApprovalsType, issuedCertificatesType } from "@/types/global.types";
import { useEffect } from "react";
import ApprovedControl from "./approvedControl";
import { useRouter } from "next/navigation";
import { FaCertificate, FaUser, FaCalendarAlt } from "react-icons/fa";
import { MdEventNote, MdVerifiedUser } from "react-icons/md";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { IoMdStats } from "react-icons/io";
import { Spinner } from "@nextui-org/react";

import { toast } from "sonner";
import { myInstance } from "@/utils/Axios/axios";

interface ApprovedCertificatesProps {
  issuedInfo: issuedCertificatesType[];
}

const ApprovedCertificates: React.FC<ApprovedCertificatesProps> = ({
  issuedInfo,
}) => {
  const router = useRouter();
  
  const [selectedEvent, setSelectedEvent] = useState<string | null>("");
  const [issuedList, setIssuedList] = useState<issuedCertificatesType[]>([]);
  const [loading , setLoading] = useState<boolean>(false);
  useEffect(() => {
    setIssuedList(issuedInfo);
  }, [issuedInfo]);

  const getIssuedCertificates = useCallback(async () => {
    setLoading(true);
    let result;
    try {
      if (selectedEvent) {
        result = await myInstance.get(
          `/member/certificate/event/get-all/${selectedEvent}`
        );
        console.log(result);
      }  else {
        router.refresh();
      }
      if (result?.data.data.length === 0 && issuedList.length === 0) {
        toast.info("No certficates found for selected filters ");
      }
      if (result) {
        const updatedResult = result.data.data.map((certificate: any) => {
          return {
            ...certificate,
            selected: false,
          };
        });
        setIssuedList(updatedResult);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [selectedEvent, router, issuedList]);
  const handleSelectOne = (index: number) => {
    const updateList = [...issuedList];
    updateList[index].selected = !updateList[index].selected;
    setIssuedList(updateList);
  };

  const handleSelectAll = () => {
    const updateList = [...issuedList];
    updateList.map((certificate) => {
      certificate.selected = true;
    });
    setIssuedList(updateList);
  };

  const handleDeselectAll = () => {
    const updateList = [...issuedList];
    updateList.map((certificate) => {
      certificate.selected = false;
    });
    setIssuedList(updateList);
  };

  console.log(issuedList);

  return (
    <div className="h-full flex flex-col">
      
      <ApprovedControl
        issuedList={issuedList}
        setIssuedList={setIssuedList}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        getIssuedCertificates={getIssuedCertificates}
      />
       {!loading ? (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border dark:border-neutral-800">
        
        <table className="w-full text-sm text-left">
          <thead className="text-md bg-neutral-100 dark:bg-neutral-800 rounded-t-lg sticky z-30 top-0">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
              >
                <div className="flex items-center gap-1">
                  <MdEventNote size={20} />
                  Event Name
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
              >
                <div className="flex items-center gap-1">
                  <FaUser size={20} />
                  Issued To
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
              >
                <div className="flex items-center gap-1">
                  <AiOutlineSafetyCertificate size={20} />
                  Certificate Name
                </div>
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
              >
                <div className="flex items-center gap-1">
                  <MdVerifiedUser size={20} />
                  Issued By
                </div>
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
              >
                <div className="flex items-center gap-1">
                  <FaCalendarAlt size={20} />
                  Issued On
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-neutral-700 dark:text-neutral-200 font-semibold"
              >
                <div className="flex items-center gap-1">
                  <IoMdStats size={20} />
                  Status
                </div>
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                <div className="flex justify-center gap-3">
                  <MyButton
                    size="sm"
                    className="bg-black dark:bg-white"
                    onClick={() => {
                      handleSelectAll();
                    }}
                  >
                    <span className="dark:text-black text-white text-md font-medium">
                      Select All
                    </span>
                  </MyButton>
                  <MyButton
                    size="sm"
                    className="bg-black dark:bg-white"
                    onClick={() => {
                      handleDeselectAll();
                    }}
                  >
                    <span className="dark:text-black text-white text-md font-medium">
                      deselect All
                    </span>
                  </MyButton>
                </div>
              </th>
            </tr>
          </thead>
          {issuedList && issuedList.length > 0 ? (
            <tbody className="">
              {issuedList.map((certificate, index) => (
                <tr key={index} className="">
                  <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    {certificate.event_name}
                  </td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    <div className="flex flex-col gap-2">
                      <span>{certificate.issued_to_name}</span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {certificate.issued_to_email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    {certificate.certificate_name}
                  </td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    <div className="flex flex-col gap-2">
                      <span>
                        {certificate.approved_by_organization ||
                          certificate.approved_by_member}
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {certificate.approved_by_organization_email ||
                          certificate.approved_by_member_email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    {certificate.issued_date}
                  </td>
                  <td
                    className={`px-6 py-4 font-medium text-center 
  ${
    certificate.revoked
      ? "text-red-400 dark:text-red-400"
      : certificate.expiry_date &&
        new Date(certificate.expiry_date) < new Date()
      ? "text-yellow-500 dark:text-yellow-400"
      : "text-green-500 dark:text-green-400"
  }`}
                  >
                    {certificate.revoked
                      ? "Revoked"
                      : certificate.expiry_date &&
                        new Date(certificate.expiry_date) < new Date()
                      ? "Expired"
                      : "Valid"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-4">
                      {/* <MyButton size="sm" className="bg-black dark:bg-white">
                        <span className="dark:text-black text-white text-md font-medium">
                          View
                        </span>
                      </MyButton> */}
                      {certificate.revoked && (
                      <Checkbox
                        isSelected={certificate.selected}
                        onValueChange={() => {
                          handleSelectOne(index);
                        }}
                        className="form-checkbox text-neutral-600 dark:text-neutral-300"
                        color="success"
                      />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-md py-4 text-neutral-900 dark:text-neutral-100"
                >
                  No history found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      
      </div>

    ) : (
      <div className="flex justify-center items-center h-full">
      <Spinner size="lg" color="current" className="dark:text-white text-black" />
  </div>
    )}
    </div>
  );
};

export default ApprovedCertificates;
