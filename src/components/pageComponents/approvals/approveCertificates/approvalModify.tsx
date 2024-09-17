import { ApprovalsType } from "@/types/global.types";
import { DatePicker, Input, Textarea } from "@nextui-org/react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useState,useEffect } from "react";
import { MyButton } from "@/components/buttons/mybutton";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import { set } from "lodash";


interface ApprovalModifyProps {
  approval: ApprovalsType;
  getApprovals: () => void;
  setIsModifyOpen: (value: boolean) => void;

}

const ApprovalModify: React.FC<ApprovalModifyProps> = ({ approval,getApprovals,setIsModifyOpen }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [trigger, setTrigger] = useState(false);
    const [comments, setComments] = useState<string | null>(null);
    const [expiryDate, setExpiryDate] = useState<string | null>(null);

    useEffect(() => {
        if(approval){
            setName(approval.issued_to_name);
            setEmail(approval.issued_to_email);
            setComments(approval.comments);
            setExpiryDate(approval.expiry_date);
        }
    }, [approval,trigger]);


    const handleUpdate = async () => {
        try{ 

            const response = await myInstance.patch("/approvals/modify",{
                approval_ulid: approval.approval_ulid,
                name: name,
                email: email,
                comments: comments,
                expiry_date: expiryDate
            })

            console.log(response.data);
            if(response.data.success){
                toast.success("Approval Updated successfully");
                setIsModifyOpen(false);
                getApprovals();
                
            }


        }
        catch(error){
            console.log(error);
        }
    }

  return (
    <div className="h-full w-full">
      <div className="flex flex-col"></div>
      <Input
         
            value={name}
            onChange={(e) => setName(e.target.value)}
            errorMessage="Name is required"
            label="Issued to"
            placeholder="Enter Name"
            className="w-full"
            size="sm"
            isRequired
        
 
          />

          <Input
            value={email}
            errorMessage={"Enter a valid email address"}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="Enter Email"
            className="w-full"
            size="sm"
            isRequired
          
          />

          <Textarea
          value={comments? comments : ""}
            onChange={(e) => setComments(e.target.value)}
            label="Comments"
            placeholder=""
            className="w-full"
            size="sm"
            description="Add any comments or notes if any"
           
          />

          <DatePicker
            value={expiryDate ? parseDate(expiryDate) : null}
            onChange={(e) => setExpiryDate(e?.toString() || null)}
            label="Expiry Date"
            description="Fill this if the certificate has an expiry date"
            minValue={today(getLocalTimeZone())}
            
          />
          <div className="flex justify-end gap-2">
            <MyButton
              className="bg-black dark:bg-white"
              size="sm"

              onClick={() => {
                handleUpdate();
              }}
           
            >
              <span className="dark:text-black text-white text-md font-medium">
                update
              </span>
            </MyButton>
            <MyButton
              className="bg-black dark:bg-white"
              size="sm"
              onClick={() => {
                setTrigger((prev) => !prev);
              }}
              >
                <span className="dark:text-black text-white text-md font-medium">
                    reset
                </span>
              </MyButton>
              </div>
    </div>
  );
};

export default ApprovalModify;
