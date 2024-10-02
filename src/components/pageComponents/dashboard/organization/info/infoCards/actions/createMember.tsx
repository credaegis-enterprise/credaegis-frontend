"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/react";
import emailValidator from "@/utils/Validators/emailValidator";


interface CreateMemberProps {
  clusterUlid: string;
  fetchClusterInfo: () => void;
    setIsOpen: (value: boolean) => void;
}

const CreateMember: React.FC<CreateMemberProps> = ({
  clusterUlid,
  fetchClusterInfo,
  setIsOpen,
}) => {
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleMemberCreate = async () => {

    setIsLoading(true);


    if (memberName === "" || memberEmail === "") {
      setIsLoading(false);
      toast.error("Please fill all the fields");
      return;
    }

    if (!emailValidator(memberEmail)) {
      setIsLoading(false);
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const response = await myInstance.post("/organization/member-control/create", {
        memberName: memberName,
        memberEmail: memberEmail,
        clusterUlid: clusterUlid,
      });

      toast.success(response.data.message);
      setMemberName("");
      setMemberEmail("");
      fetchClusterInfo();
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
    }

    setIsLoading(false);

  };
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <Input
          isRequired={true}
          type="text"
          label="Member Name"
          size="md"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
        />
        <Input
          isRequired={true}
          type="email"
          label="Member Email"
          size="md"
          value={memberEmail}
          onChange={(e) => setMemberEmail(e.target.value)}
        />
        <MyButton
          className="bg-black dark:bg-white"
          size="md"
          spinner={<Spinner size="sm" color="default" />}
          isLoading={isLoading}
          onClick={handleMemberCreate}
        >
          <span className="dark:text-black text-white text-md font-medium">
           Create Member
          </span>
        </MyButton>
      </div>
    </div>
  );
};

export default CreateMember;
