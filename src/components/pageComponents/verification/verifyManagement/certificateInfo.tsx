import { AiFillCheckCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { verificationResponseType } from "@/types/certificateVerificationTypes";
import { Input } from "@nextui-org/react";
import { MdInfo } from "react-icons/md";
import { DatePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { FileInfo } from "@/types/global.types";
import React from "react";
import { Textarea } from "@nextui-org/react";

interface CertificateInfoProps {
  verificationStatus: verificationResponseType[] | null;
  fileUrl: FileInfo | null;
}

const CertificateInfo: React.FC<CertificateInfoProps> = ({
  verificationStatus,
  fileUrl,
}) => {
  const [info, setInfo] = useState<verificationResponseType | null>(null);
  const [verificationStatusPresent, setVerificationStatusPresent] =
    useState<boolean>(false);
  const [isIssued, setIsIssued] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const [revoked, setRevoked] = useState<boolean>(false);
  const [isAuthentic, setIsAuthentic] = useState<boolean>(false);
  const [verificationColor, setVerificationColor] =
      useState<"success" | "warning" | "default" | "primary" | "secondary" | "danger" | undefined>(undefined);

  const [authenticityStatus, setAuthenticityStatus] = useState<string>("");

  useEffect(() => {

    console.log("verificationStatus", verificationStatus);
    if (fileUrl && verificationStatus) {
      const fileInfo = verificationStatus.find(
        (status) => status.certificateName === fileUrl.filename
      );
      if (fileInfo === undefined) {
        setVerificationStatusPresent(false);
      }
      if (fileInfo) {
        setVerificationStatusPresent(true);
        if (fileInfo.isIssued) setIsIssued(true);
        else setIsIssued(false);

        if (fileInfo.info?.revoked === true) {
          setAuthenticityStatus("This certificate has been revoked.");
          setRevoked(true);
        } else if (
          fileInfo.info?.expiryDate &&
          new Date(fileInfo.info?.expiryDate) < new Date()
        ) {
          setAuthenticityStatus("Your certificate has expired.");
          setExpired(true);
        } else {
          if(fileInfo.isPublicVerified) {
            setVerificationColor("success");
            setAuthenticityStatus("Your certificate is verified and original.");
          }
          else {
            setVerificationColor("warning");
            setAuthenticityStatus("Your certificate is pending verification in public blockchain.");
          }

          setIsAuthentic(true);
          setRevoked(false);
          setExpired(false);
        }

        console.log("fileInfo", fileInfo);
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
            isReadOnly
            size="sm"
          />

          {info && verificationStatusPresent ? (
            <>
              {info && info.infoFound ? (
                <div className="flex flex-col gap-3">
                  <Input
                    label="Authenticity Status"
                    disabled
                    size="sm"
                    color={verificationColor || "default"}
                    value={authenticityStatus}
                    isReadOnly
                    isInvalid={revoked || expired}
                    errorMessage={
                      revoked
                        ? "This certificate has been revoked."
                        : expired
                        ? "This certificate has expired."
                        : ""
                    }
                  />
                  {revoked && info.info?.revokedDate && (
                    <DatePicker
                      isReadOnly
                      label="Revoked Date"
                      value={parseDate(
                        new Date(info.info.revokedDate)
                          .toISOString()
                          .split("T")[0]
                      )}
                      size="sm"
                    />
                  )}

                  {info.info?.expiryDate && (
                    <DatePicker
                      isInvalid={expired}
                      isReadOnly
                      label="Expiry Date"
                      value={parseDate(
                        new Date(info.info.expiryDate).toISOString().split("T")[0]
                      )}
                      errorMessage={"This certificate has expired."}
                      size="sm"
                    />
                  )}

                  {info.info?.issuedDate && (
                    <DatePicker
                      label="Issued Date"
                      value={parseDate(
                        new Date(info.info.issuedDate)
                          .toISOString()
                          .split("T")[0]
                      )}
                      isReadOnly
                      size="sm"
                    />
                  )}

                  <Input
                    label="Event under which this certifcate is issued"
                    readOnly
                    value={info?.info?.eventName ?? ""}
                    size="sm"
                  />
                  <Input
                    label="Name of the certificate holder"
                    readOnly
                    value={info?.info?.recipientName}
                    size="sm"
                  />
                  <Input
                    label="email"
                    readOnly
                    value={info?.info?.recipientEmail}
                    size="sm"
                  />
                  <Input
                    label="Issuing Organization name"
                    readOnly
                    value={info?.info?.organizationName}
                    size="sm"
                  />
                  <Textarea
                    label="Comments"
                    readOnly
                    value={
                      info?.info?.comments
                        ? info?.info?.comments
                        : "There are no comments."
                    }
                    size="sm"
                  />
                </div>
              ) : (
                <>
                  {info && !info.isIssued ? (
                    <div className="flex flex-col items-center p-4 mt-20 gap-4 border  border-gray-300  dark:border-stone-800 rounded-lg shadow-md max-w-md mx-auto">
                      <div className="flex items-center gap-3">
                        <BsExclamationTriangleFill
                          size={25}
                          className="text-yellow-400"
                        />
                        <div className="text-xl font-semibold ">Not issued</div>
                      </div>
                      <div className="text-center text-sm ">
                        This certificate is not issued or verified by any
                        registered organizations in Credaegis. Please ensure you
                        have uploaded the correct file or contact the issuing
                        organization for more information.
                      </div>
                    </div>
                  ) : (
                    
                      <div className="flex flex-col text-lg  text-gray-800 dark:text-gray-200">
                        <Input
                          label="Authenticity Status"
                          disabled
                          size="sm"
                          color={isAuthentic ? "success" : "default"}
                          value={"This certificate is verified and original."}
                          isReadOnly
                        />

                        <div className="mt-10 p-2 bg-stone-850 dark:bg-stone-900 border dark:border-stone-800 rounded-lg ">
                        <div className="flex items-center gap-3 w-full">
                          <BsExclamationTriangleFill
                            size={25}
                            className="text-yellow-400"
                          />
                          <div className="text-xl font-semibold ">
                            No additional information is found
                          </div>
                        </div>
                        </div>
                      </div>
        
                  )}
                </>
              )}
            </>
          ) : (
            <div className="flex p-2 justify-center mt-20 gap-2 bg-gray-200 dark:bg-stone-800 border dark:border-stone-800 rounded-lg break-words">
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
