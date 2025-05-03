import { ApprovalsType } from "@/types/global.types";
import { DatePicker, Input, Textarea } from "@nextui-org/react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useState,useEffect } from "react";
import { MyButton } from "@/components/buttons/mybutton";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/react";
import emailValidator from "@/utils/Validators/emailValidator";
import { set } from "lodash";
import { ApprovalInfoType } from "@/types/approvalInfo.type";


interface ApprovalModifyProps {
  approval: ApprovalInfoType;
  getApprovals: () => void;
  setIsModifyOpen: (value: boolean) => void;

}

const ApprovalModify: React.FC<ApprovalModifyProps> = ({ approval,getApprovals,setIsModifyOpen }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [comments, setComments] = useState<string | null>(null);
    const [expiryDate, setExpiryDate] = useState<string | null>(null);
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    useEffect(() => {
        if(approval){
            setName(approval.recipientName);
            setEmail(approval.recipientEmail);
            setComments(approval.comment);
            setExpiryDate(approval.expiryDate);
        }
    }, [approval,trigger]);


    const handleUpdate = async () => {

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

          setLoading(true);
        try{ 

            const response = await myInstance.put("/member/approval-control/modify",{
                approvalId: approval.id,
                recipientName: name,
                recipientEmail: email,
                comments: comments,
                expiryDate: expiryDate
            })

            console.log(response.data);
            if(response.data.success){
                toast.success("Approval updated successfully");
                setIsModifyOpen(false);
                getApprovals();
                
            }


        }
        catch(error){
            console.log(error);
        }
        setLoading(false);
    }

  return (
    <div className="h-full w-full">
      <div className="flex flex-col"></div>
      <Input
            isInvalid={isNameEmpty}
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
            isInvalid={isEmailValid}
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
            value={expiryDate ? parseDate(new Date(expiryDate).toISOString().split("T")[0]) : null}
            onChange={(e) => setExpiryDate(e?.toString() || null)}
            label="Expiry Date"
            description="Fill this if the certificate has an expiry date"
            minValue={today(getLocalTimeZone())}
            
          />
          <div className="flex justify-end gap-2">
            <MyButton
              className="bg-black dark:bg-white"
              isLoading={loading}
              spinner={<Spinner size="sm" color="default"/>}
              size="sm"

              onClick={() => {
                handleUpdate();
              }}
           
            >
              <span className="dark:text-black text-white text-md font-medium">
                Update
              </span>
            </MyButton>
            <MyButton
              className="bg-black dark:bg-white"
              size="sm"
              onClick={() => {
                setIsEmailValid(false);
                setIsNameEmpty(false);
                setTrigger((prev) => !prev);
              }}
              >
                <span className="dark:text-black text-white text-md font-medium">
                    Reset
                </span>
              </MyButton>
              </div>
    </div>
  );
};

export default ApprovalModify;
