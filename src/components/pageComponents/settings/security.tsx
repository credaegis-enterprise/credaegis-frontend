import { Input } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import { MyButton } from "@/components/buttons/mybutton";
import { FaKey, FaShieldAlt } from "react-icons/fa";
import { RiShieldCheckLine } from "react-icons/ri";
import { BiLockAlt } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";

const Security = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleChangePassword = () => {
    // Add your password change logic here
    toast.success("Password changed successfully!");
  };

  const handleEnable2FA = () => {
    // Add your 2FA enabling logic here
    toast.success("2FA enabled successfully!");
  };

  return (
    <div className="h-full">
      <div className="grid grid-rows-2 h-full gap-3 ">
        <div className="row-span-1 h-full ">
          <div className="flex items-center gap-3 mb-6">
            <FaShieldAlt size={26} />
            <h2 className="text-2xl ">Change Password</h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between mb-6 border border-gray-200 dark:border-stone-800 p-6 rounded-lg">
            <div className="flex flex-col max-w-sm  rounded-lg p-4">
              <div className="flex flex-col  ">
                <div className="flex justify-start gap-2">
                  <FaInfoCircle size={26} className=" text-yellow-400" />
                  <h3 className="text-lg font-semibold">
                    Password Requirements
                  </h3>
                </div>
                <div className="mt-5 ml-3 ">
                  <div className="text-md ">
                    Your new password must be at least 8 characters long and
                    contain at least one uppercase letter, one lowercase letter,
                    one number, and one special character.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full max-w-sm gap-2">
              <Input
                label="Old Password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className=""
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
                onChange={(e) => setConfirmPassword(e.target.value)}
                startContent={<BiLockAlt />}
              />
              <MyButton
                className="bg-black dark:bg-gray-200 text-white dark:text-black"
                size="md"
                onClick={handleChangePassword}
              >
                Change Password
              </MyButton>
            </div>
          </div>
        </div>
        <div className="row-span-1  h-full">
            <div className="flex h-full flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 ">
                <RiShieldCheckLine size={26} />
                <h2 className="text-2xl ">Two Factor Authentication</h2>
            </div>
            <div className="flex md:flex-row justify-between  border border-gray-200 dark:border-stone-800 p-6 rounded-lg">
                <div className="flex flex-col max-w-sm  rounded-lg p-4">
                <div className="flex flex-col ">
                    <div className="flex justify-start gap-2">
                    <FaInfoCircle size={26} className=" text-yellow-400" />
                    <h3 className="text-lg font-semibold">2FA Requirements</h3>
                    </div>
                    <div className="mt-5 ml-3 ">
                    <div className="text-md ">
                      Enable Two-Factor Authentication for an extra layer of security.
                      Compatable with Google Authenticator and other 2FA apps.
                    </div>
                    </div>
                </div>
                </div>
                <div className="flex flex-col  justify-center w-full max-w-sm gap-2">
                <MyButton
                    className="bg-black dark:bg-gray-200 text-white dark:text-black"
                    size="md"
                    onClick={handleEnable2FA}
                >
                    Setup 2FA
                </MyButton>
            </div>
            </div>
            </div>

        </div>
      </div>
    </div>
   
  );
};

export default Security;
