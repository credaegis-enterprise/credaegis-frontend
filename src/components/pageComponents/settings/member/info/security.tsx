"ise client";

import { Input } from "@nextui-org/react";
import {  useState } from "react";
import { toast } from "sonner";
import { MyButton } from "@/components/buttons/mybutton";
import {  FaShieldAlt } from "react-icons/fa";
import { RiShieldCheckLine } from "react-icons/ri";
import { BiLockAlt } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";
import { myInstance } from "@/utils/Axios/axios";
import MyModal from "@/components/modals/mymodal";
import { MdWarning } from "react-icons/md";
import { useRouter } from "next/navigation";
import CreateTwoFa from "./actions/createTwoFa";
import { Spinner } from "@nextui-org/react";

interface SecurityProps {
  two_fa_enabled: boolean;
}

const Security: React.FC<SecurityProps> = ({ two_fa_enabled }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [IsOpenTwofa, setIsOpenTwofa] = useState(false);
  const [notMatch, setNotMatch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [disablePopup, setDisablePopup] = useState(false);
  const [isLoadingDisable, setIsLoadingDisable] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  const router = useRouter();

  const handleChecks = () => {
    if (newPassword == "" || confirmPassword == "" || oldPassword === "") {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setNotMatch(true);
      return;
    }
    setIsOpen(true);
  };

  const handleChangePassword = async () => {
    setIsLoadingPassword(true);
    try {
      const response = await myInstance.put("/member/account/change-password", {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      // await myInstance.post("/organization/auth/logout");


      toast.success("Password changed successfully! Please login again");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
   
    setIsLoadingPassword(false);
    setIsOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
  };

  const disableTwoFa = async () => {
    setIsLoadingDisable(true);
    try {
      const response = await myInstance.put("member/account/mfa/disable");
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error);
    }
    setIsLoadingDisable(false);
    router.refresh();
    setDisablePopup(false);
  };

  return (
    <div className="h-full overflow-auto p-4">
      <div className="flex flex-col space-y-6 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaShieldAlt size={26} />
            <h2 className="text-2xl">Change Password</h2>
          </div>
          <div className="border border-gray-200 dark:border-stone-800 p-4 rounded-lg space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <FaInfoCircle size={26} className="text-yellow-400" />
                  <h3 className="text-lg font-semibold">
                    Password Requirements
                  </h3>
                </div>
                <p className="text-md">
                  Your new password must be at least 8 characters long and
                  contain at least one uppercase letter, one lowercase letter,
                  one number, and one special character.
                </p>
              </div>
              <div className="flex-1 space-y-3">
                <Input
                  label="Old Password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  startContent={<BiLockAlt />}
                />
                <Input
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  startContent={<BiLockAlt />}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  isInvalid={notMatch}
                  errorMessage="Passwords do not match"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  startContent={<BiLockAlt />}
                />
                <MyButton
                  className="bg-black w-full dark:bg-gray-200 text-white dark:text-black"
                  size="md"
                  onClick={handleChecks}
        
                >
                  Change Password
                </MyButton>
              </div>
            </div>
          </div>
        </div>

      
        <div>
          <div className=" flex h-full items-center gap-2 mb-4">
            <RiShieldCheckLine size={26} />
            <h2 className="text-2xl">Two Factor Authentication</h2>
          </div>
          <div className="border border-gray-200 dark:border-stone-800 p-4 rounded-lg space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <FaInfoCircle size={26} className="text-yellow-400" />
                  <h3 className="text-lg font-semibold">2FA Requirements</h3>
                </div>
                <p className="text-md">
                  Enable Two-Factor Authentication for an extra layer of
                  security. Compatible with Google Authenticator and other 2FA
                  apps.
                </p>
              </div>
              <div className="flex-1 flex justify-center items-center">
                {!two_fa_enabled ? (
                  <MyButton
                    className="bg-black dark:bg-gray-200 text-white dark:text-black"
                    size="md"
                    onClick={() => setIsOpenTwofa(true)}
                  >
                    Setup 2FA
                  </MyButton>
                ) : (
                  <MyButton
                    className="bg-black dark:bg-gray-200 text-white dark:text-black"
                    size="md"
                  
                 
                    onClick={() => setDisablePopup(true)}
                  >
                    Disable 2FA
                  </MyButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isOpen && (
        <MyModal
          size="sm"
          isOpen={isOpen}
          backdrop="blur"
          onOpen={() => {}}
          content={
            <div className="flex flex-col">
              <div className="text-xl font-semibold mb-4 text-center">
                Are you sure?
              </div>
              <div className="flex gap-2">
                <MdWarning size={26} className="text-yellow-400" />
                <p className="text-md text-yellow-400 font-medium mb-4">
                  Changing password will immediately log you out of all devices.
                </p>
              </div>
            </div>
          }
          onClose={() => setIsOpen(false)}
          title="Change Password"
          button1={
            <MyButton
              className="bg-black dark:bg-gray-200 text-white dark:text-black"
              size="md"
              onClick={handleChangePassword}
              isLoading={isLoadingPassword}
              spinner={<Spinner size="sm" color="default" />}
            >
              Change Password
            </MyButton>
          }
          button2={
            <MyButton
              className="bg-black dark:bg-gray-200 text-white dark:text-black"
              size="md"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </MyButton>
          }
        />
      )}

      {IsOpenTwofa && (
        <MyModal
          size="sm"
          isOpen={IsOpenTwofa}
          backdrop="blur"
          onOpen={() => { } }
          content={<CreateTwoFa setIsOpenTwofa={setIsOpenTwofa} />}
          onClose={() => setIsOpenTwofa(false)}
          title="Setup 2FA" button1={undefined} button2={undefined}        />
      )}

      {disablePopup && (
        <MyModal
          size="sm"
          isOpen={disablePopup}
          backdrop="blur"
          onOpen={() => setDisablePopup(true)}
          content={
            <div className="flex flex-col">
              <div className="text-xl font-semibold mb-4 text-center">
                Are you sure?
              </div>
              <div className="flex gap-2">
                <MdWarning size={26} className="text-yellow-400" />
                <p className="text-md text-yellow-400 font-medium mb-4">
                  Disabling 2FA will make your account less secure.
                </p>
              </div>
            </div>
          }
          onClose={() => setDisablePopup(false)}
          title="Disable 2FA"
          button1={
            <MyButton
              className="bg-black dark:bg-gray-200 text-white dark:text-black"
              size="md"
              onClick={disableTwoFa}
              spinner={<Spinner size="sm" color="default" />}
              isLoading={isLoadingDisable}
            >
              Disable 2FA
            </MyButton>
          }
          button2={
            <MyButton
              className="bg-black dark:bg-gray-200 text-white dark:text-black"
              size="md"
              onClick={() => setDisablePopup(false)}
            >
              Cancel
            </MyButton>
          }
        />
      )}
    </div>
  );
};

export default Security;
