import { Input, Textarea } from "@nextui-org/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { FileInfo } from "@/types/global.types";
import { MyButton } from "@/components/buttons/mybutton";
import { filesMetaType } from "@/types/global.types";
import { useState, useEffect } from "react";
import emailValidator from "@/utils/Validators/emailValidator";
import { toast } from "sonner";

interface MyFileMetaProps {
  fileUrl: FileInfo | null;
  fileCount: number;
  setFilesMetaInfo: (filesMetaInfo: filesMetaType[] | []) => void;
  filesMetaInfo: filesMetaType[] | null;
}

const MyFileMeta: React.FC<MyFileMetaProps> = ({
  fileUrl,
  fileCount,
  setFilesMetaInfo,
  filesMetaInfo,
  
}) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {

    setIsEmailValid(false);
    setIsNameEmpty(false); 
  
    if (fileUrl && Array.isArray(filesMetaInfo) && filesMetaInfo.length > 0) { 
        
      
        
        const index = filesMetaInfo.findIndex((meta) => meta.id === fileUrl.fileindex);
        
        if (index !== -1) {
            const meta = filesMetaInfo[index]; 
            setName(meta.name);
            setEmail(meta.email);
            setComments(meta.Comment);
            setExpiryDate(meta.expiryDate);
        } else {
            console.log("No file meta found for the given file index");
            setName("");
            setEmail("");
            setComments(null);
            setExpiryDate(null);
        }
    } else {
        console.log("Condition not met for fileUrl or filesMetaInfo");
        setName("");
        setEmail("");
        setComments(null);
        setExpiryDate(null);
    }
}, [fileUrl, filesMetaInfo, fileCount]);

  const handleSave = () => {


    if (!name) {
      setIsNameEmpty(true);
      toast.error("Name is required");
    }
    else
        setIsNameEmpty(false);

    if (!emailValidator(email)) {
      setIsEmailValid(true);
        toast.error("Please enter a valid email address");

    }
    else
        setIsEmailValid(false);

    if (!name || !emailValidator(email)) {
      return;
    }

   
    if (fileUrl) {
      const updatedFileMeta: filesMetaType = {
        id: fileUrl.fileindex,
        name,
        email,
        expiryDate: expiryDate || "",
        Comment: comments || "",
        filename: fileUrl.filename,
      };

      console.log(updatedFileMeta);

      if (filesMetaInfo) {
        const updatedMetaInfo = [...filesMetaInfo];
        const index = updatedMetaInfo.findIndex((meta) => meta.id === fileUrl.fileindex);
        if (index === -1) {
          updatedMetaInfo.push(updatedFileMeta);
        }
        else
            updatedMetaInfo[index] = updatedFileMeta;
        setFilesMetaInfo(updatedMetaInfo);
      }
    }
  };

  return (
    <div className="h-full w-full flex flex-col gap-2">
      <div className="flex justify-between p-2">
        <div className="flex gap-2 mt-1">
          <AiFillCheckCircle size={26} />
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Fill information
          </div>
          {fileUrl && (
  <div className={`ml-3 text-xl font-medium text-gray-800 ${filesMetaInfo && filesMetaInfo.length / fileCount === 1 ? 'dark:text-green-400' : 'dark:text-yellow-400'}`}>
    {filesMetaInfo?.length}/{fileCount}
  </div>
)}
        </div>
      </div>

      {fileUrl ? (
        <div className="p-2 flex flex-col gap-3">
          <Input
            isInvalid={isNameEmpty}
            errorMessage="Name is required"
            label="Issued to"
            placeholder="Enter Name"
            className="w-full"
            size="sm"
            isRequired
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            isInvalid={isEmailValid}
            errorMessage={"Enter a valid email address"}
            label="Email"
            placeholder="Enter Email"
            className="w-full"
            size="sm"
            isRequired
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Textarea
            label="Comments"
            placeholder=""
            className="w-full"
            size="sm"
            description="Add any comments or notes if any"
            value={comments? comments : ""}
            onChange={(e) => setComments(e.target.value)}
          />

          <DatePicker
            label="Expiry Date"
            description="Fill this if the certificate has an expiry date"
            minValue={today(getLocalTimeZone())}
            value={expiryDate ? parseDate(expiryDate) : null}
            onChange={(e) => setExpiryDate(e?.toString() || null)}
          />

          <div className="flex justify-end">
            <MyButton className="bg-black dark:bg-white" size="sm" onClick={handleSave}>
              <span className="dark:text-black text-white text-md font-medium">
                Save
              </span>
            </MyButton>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-10">
            No file selected
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFileMeta;
