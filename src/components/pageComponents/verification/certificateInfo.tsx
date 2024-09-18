import { AiFillCheckCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { verificationStatusType, FileInfo } from "@/types/global.types";
import { Input } from "@nextui-org/react";
import { MdInfo } from "react-icons/md";
import { DatePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { BsExclamationTriangleFill } from "react-icons/bs";

interface CertificateInfoProps {
  verificationStatus: verificationStatusType[];
  fileUrl: FileInfo | null;
}

const CertificateInfo: React.FC<CertificateInfoProps> = ({
  verificationStatus,
  fileUrl,
}) => {
  const [info, setInfo] = useState<verificationStatusType | null>(null);
  const [isIssued, setIsIssued] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const [revoked, setRevoked] = useState<boolean>(false);

  useEffect(() => {
    if (fileUrl && verificationStatus) {
      const fileInfo = verificationStatus.find(
        (status) => status.filename === fileUrl.filename
      );
      if (fileInfo) {
        if (fileInfo.isIssued) setIsIssued(true);
        else setIsIssued(false);

        if (
          fileInfo.info?.expiry_date &&
          new Date(fileInfo.info?.expiry_date) < new Date()
        )
          setExpired(true);

        if (fileInfo.info?.revoked === 1) {
          setRevoked(true);
        }

        setInfo(fileInfo);
      }
    }
  }, [fileUrl, verificationStatus]);

  return (
    <div className="h-full w-full flex flex-col gap-2">
      <div className="flex justify-between p-2">
        <div className="flex gap-2 mt-1">
          <AiFillCheckCircle size={26} />
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            File Status
          </div>
        </div>
      </div>

      {!fileUrl ? (
        <div className="flex justify-center items-center h-full">
          <div className="text-lg  text-gray-800 dark:text-gray-200">
            Select a file to view its status.
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 p-2">
          <Input
            label="File Name"
            value={fileUrl.filename}
            disabled
            size="sm"
          />

          {info && verificationStatus.length !== 0 ? (
            <>
              {isIssued ? (
                <div className="flex flex-col gap-3">
                  <Input label="Authenticity" disabled size="sm" />
                  <Input label="Issued By" disabled size="sm" />
                  <Input label="Issued On" disabled size="sm" />
                  {info.info?.expiry_date !== null && (
                    <>
                      <DatePicker
                        label="Expiry Date"
                        value={
                          info.info?.expiry_date
                            ? parseDate(info.info?.expiry_date)
                            : null
                        }
                        size="sm"
                      />
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center p-4 mt-20 gap-4 border border-blue-500 dark:border-stone-800 rounded-lg shadow-md max-w-md mx-auto">
                <div className="flex items-center gap-3">
                <BsExclamationTriangleFill size={25} className="text-yellow-400" />
                  <div className="text-xl font-semibold ">
                    Not issued
                  </div>
                </div>
                <div className="text-center text-sm ">
                  This certificate is not issued or verified by any registered organizations in Credaegis. Please ensure you have uploaded the correct file or contact the issuing organization for more information.
                </div>
               
              </div>
              
              )}
            </>
          ) : (
            <div className="flex p-2 justify-center mt-20 gap-2 bg-stone-900 border dark:border-stone-800 rounded-lg break-words">
              <MdInfo size={30} className="text-blue-500 p-1" />
              <div className="text-md font-normal ">
                Please upload the file to view its authenticity.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificateInfo;
