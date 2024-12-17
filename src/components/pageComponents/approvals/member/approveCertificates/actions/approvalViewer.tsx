import MyModal from "@/components/modals/mymodal";
import { useState } from "react";
import { MyButton } from "@/components/buttons/mybutton";

interface ApprovalViewerProps {

  approvalId: string;
  approvalFileName: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ApprovalViewer: React.FC<ApprovalViewerProps> = ({
  approvalId,
  approvalFileName,
  
  isOpen,
  setIsOpen,
}) => {


  return (
  
 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-4xl w-full h-4/5 flex flex-col">
    {/* PDF Viewer Section */}
    <div className="flex justify-between items-center p-4 dark:bg-stone-800 dark:text-white">
      <h2 className="text-lg">{approvalFileName}</h2>
      <MyButton size="sm" onClick={() => setIsOpen(false)} className="bg-black dark:bg-white">
        <span className="dark:text-black text-white text-md font-medium">Close</span>
      </MyButton>
    </div>
    
    <iframe
      src={`${process.env.NEXT_PUBLIC_devbackendurl}/member/approval-control/view/${approvalId}`}
      className="h-full w-full"
    />

  </div>
</div>
       
  
    
    
    

  );
};

export default ApprovalViewer;
