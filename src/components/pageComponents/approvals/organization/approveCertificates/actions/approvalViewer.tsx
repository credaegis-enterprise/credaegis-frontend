import MyModal from "@/components/modals/mymodal";
import { useEffect, useState } from "react";
import { MyButton } from "@/components/buttons/mybutton";
import { myInstance } from "@/utils/Axios/axios";

interface ApprovalViewerProps {
  cluster_ulid: string;
  event_ulid: string;
  approval_file_ulid: string;
  approval_file_name: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ApprovalViewer: React.FC<ApprovalViewerProps> = ({
  cluster_ulid,
  event_ulid,
  approval_file_ulid,
  approval_file_name,
  isOpen,
  setIsOpen,
}) => {


  const [url, setUrl] = useState<string>("");


  useEffect(() => {
    fetchApprovalFile();
  }, [approval_file_ulid]);



  const fetchApprovalFile = async () => {
    try {
      const response = await myInstance.get(
        `/organization/approval-control/view/${approval_file_ulid}`
      ,{
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setUrl(url);
      console.log(response);
      
    } catch (error: any) {
      console.log(error);
    }
  }


  return (
  
 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-4xl w-full h-4/5 flex flex-col">
    <div className="flex justify-between items-center p-4 dark:bg-stone-800 dark:text-white">
      <h2 className="text-lg">{approval_file_name}</h2>
      <MyButton size="sm" onClick={() => setIsOpen(false)} className="bg-black dark:bg-white">
        <span className="dark:text-black text-white text-md font-medium">Close</span>
      </MyButton>
    </div>
    
    <iframe
      src={url}
      className="h-full w-full"
    />

  </div>
</div>
       
  
    
    
    

  );
};

export default ApprovalViewer;
