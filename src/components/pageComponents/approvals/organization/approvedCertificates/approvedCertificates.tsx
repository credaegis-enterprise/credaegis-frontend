import { MyButton } from "@/components/buttons/mybutton";
import { Checkbox } from "@nextui-org/react";

import { use, useCallback, useState } from "react";
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
import { Pagination } from "@nextui-org/react";
import { start } from "repl";
import { filter, set } from "lodash";
import { CertificateInfoType } from "@/types/issuedCertificateInfo.types";

interface ApprovedCertificatesProps {
  issuedInfo: CertificateInfoType[];
  issuedCount: number;
}

const ApprovedCertificates: React.FC<ApprovedCertificatesProps> = ({
  issuedInfo,
  issuedCount,
}) => {
  const router = useRouter();
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [issuedList, setIssuedList] = useState<CertificateInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterOn, setFilterOn] = useState<boolean>(false);

  useEffect(() => {
    setIssuedList(issuedInfo);
  }, [issuedInfo]);

  const getIssuedCertificates = useCallback(async () => {
    console.log("getIssuedCertificates function called");

    setLoading(true);
    let result;
    try {
      if (selectedEvent) {
     
        result = await myInstance.get(
          `/organization/certificate-control/event/${selectedEvent}/get-latest?page=0&size=5`
        );

        console.log(result);
      } else if (selectedCluster) {
        result = await myInstance.get(
          `/organization/certificate-control/cluster/${selectedCluster}/get-latest?page=0&size=5`
        );
      } else {
        router.refresh();
      }

      if (result?.data.responseData.certificates.length === 0 && issuedList.length === 0) {
        toast.info("No certficates found for selected filters ");
      }
      if (result) {
        
        const updatedResult: CertificateInfoType[] = result.data.responseData.certificates

        console.log("updated result");
        console.log(updatedResult);
        const count = result.data.responseData.count === 0 ? 1 : result.data.responseData.count;
        setTotalCount(count);
        setIssuedList(updatedResult);
        setFilterOn(true);
        setCurrentPage(1);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);

  }, [selectedCluster, selectedEvent, router, issuedList]);


  

  const handleSelectOne = (index: number) => {
    const updateList = [...issuedList];
    updateList[index].selected = !updateList[index].selected;
    if (updateList[index].selected) {
      setSelectedCount(selectedCount + 1);
    }
    if (!updateList[index].selected) {
      setSelectedCount(selectedCount - 1);
    }
    setIssuedList(updateList);
  };

  const handleSelectAll = () => {
    const updateList = [...issuedList];
    updateList.map((certificate) => {
      certificate.selected = true;
    });
    setSelectedCount(updateList.length);
    setIssuedList(updateList);
  };

  const handleDeselectAll = () => {
    const updateList = [...issuedList];
    setSelectedCount(0);
    updateList.map((certificate) => {
      certificate.selected = false;
    });
    setIssuedList(updateList);
  };

  console.log(issuedList);
  console.log(currentPage);
  console.log("total count", totalCount);

  const pageChange = async (pageNumber: number) => {
    console.log("pageChange function called"+ pageNumber);
 
    if (pageNumber === currentPage) {
      return;
    }
    setCurrentPage(pageNumber);
    const rowCount = 5;
    let result;


    try {
      if (filterOn) {
        if (selectedEvent) {
          result = await myInstance.get(
            `/organization/certificate-control/event/${selectedEvent}/get-latest?page=${pageNumber-1}&size=${rowCount}`
          );


        } else if (selectedCluster) {
          result = await myInstance.get(
            `/organization/certificate-control/cluster/${selectedCluster}/get-latest?page=${pageNumber-1}&size=${rowCount}`
          );
        }
      } else {
        result = await myInstance.get(
          `/organization/certificate-control/get-latest?page=${pageNumber-1}&size=${rowCount}`
        );
      }

      if (result?.data.responseData.certificates.length === 0 && issuedList.length === 0) {
        toast.info("No certficates found for selected filters ");
      }
      if (result) {
        const updatedResult: CertificateInfoType[] = result.data.responseData.certificates
        setIssuedList(updatedResult);

        const count = result.data.responseData.count === 0 ? 1 : result.data.responseData.count;
        if (filterOn) {
          setTotalCount(count);
        }
      } else {
        setTotalCount(1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log("issued count", issuedCount);
  console.log("cuurent page", currentPage);
  console.log("total count", totalCount);
  console.log("filter on", filterOn);

  return (
    <div className="h-full flex flex-col">
      <ApprovedControl
        issuedList={issuedList}
        setIssuedList={setIssuedList}
        selectedCluster={selectedCluster}
        setSelectedCluster={setSelectedCluster}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        getIssuedCertificates={getIssuedCertificates}
        selectedCount={selectedCount}
        setSelectedCount={setSelectedCount}
        setFilterOn={setFilterOn}
        setCurrentPage={setCurrentPage}
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
                      {certificate.eventName}
                    </td>
                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                      <div className="flex flex-col gap-2">
                        <span>{certificate.recipientName}</span>
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {certificate.recipientEmail}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                      {certificate.certificateName}
                    </td>
                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                      <div className="flex flex-col gap-2">
                        <span>
                          {certificate.issuerName}
                        </span>
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {certificate.issuerEmail}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    {certificate.issuedDate ? new Date(certificate.issuedDate).toLocaleDateString() : "N/A"}
                    </td>
                    <td
                      className={`px-6 py-4 font-medium text-center 
  ${
    certificate.revoked
      ? "text-red-400 dark:text-red-400"
      : certificate.expiryDate &&
        new Date(certificate.expiryDate) < new Date()
      ? "text-yellow-500 dark:text-yellow-400"
      : "text-green-500 dark:text-green-400"
  }`}
                    >
                      {certificate.revoked
                        ? "Revoked"
                        : certificate.expiryDate &&
                          new Date(certificate.expiryDate) < new Date()       
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
                        {!certificate.revoked && (
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
                    colSpan={8}
                    className="text-center text-md py-4 text-neutral-900 dark:text-neutral-100"
                  >
                    No certificate Issue History found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <Spinner
            size="lg"
            color="current"
            className="dark:text-white text-black"
          />
        </div>
      )}

      <div className="flex justify-center items-center p-4  ">
        <Pagination
          page={currentPage}
          initialPage={currentPage}
          total={
            filterOn ? Math.ceil(totalCount / 5) : Math.ceil(issuedCount / 5)
          }
          onChange={(e) => pageChange(e)}
        />
      </div>
    </div>
  );
};

export default ApprovedCertificates;
