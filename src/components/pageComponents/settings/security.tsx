"ise client";

import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MyButton } from "@/components/buttons/mybutton";
import { FaKey, FaShieldAlt } from "react-icons/fa";
import { RiShieldCheckLine } from "react-icons/ri";
import { BiLockAlt } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";
import { myInstance } from "@/utils/Axios/axios";
import MyModal from "@/components/modals/mymodal";
import { FaW } from "react-icons/fa6";
import { MdWarning } from "react-icons/md";
import { useRouter } from "next/navigation";
import CreateTwoFa from "./createTwoFa";

interface SecurityProps {
  two_fa_enabled: boolean;
}
const Security: React.FC<SecurityProps> = ({ two_fa_enabled }) => {
  console.log(two_fa_enabled);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [IsOpenTwofa, setIsOpenTwofa] = useState(false);
  const [notMatch, setNotMatch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [disablePopup, setDisablePopup] = useState(false);
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);

  useEffect(() => {
    if (two_fa_enabled) {
      setTwoFaEnabled(true);
    }
  }, []);

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
    try {
      const response = await myInstance.patch("/settings/changepassword", {
        old_password: oldPassword,
        new_password: newPassword,
      });

      toast.success("Password changed successfully!,Please login again");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data.message || "An error occurred");
    }

    setIsOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const disableTwoFa = async () => {

    try {
      const response = await myInstance.post("/settings/disableTwofa");
      toast.success(response.data.message);
      setTwoFaEnabled(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data.message || "An error occurred");
    }
    setDisablePopup(false);
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
                isInvalid={notMatch}
                errorMessage="Passwords do not match"
                onChange={(e) => setConfirmPassword(e.target.value)}
                startContent={<BiLockAlt />}
              />
              <MyButton
                className="bg-black dark:bg-gray-200 text-white dark:text-black"
                size="md"
                onClick={() => {
                  handleChecks();
                }}
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
                      Enable Two-Factor Authentication for an extra layer of
                      security. Compatable with Google Authenticator and other
                      2FA apps.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  justify-center w-full max-w-sm gap-2">
                {!twoFaEnabled ? (
                  <MyButton
                    className="bg-black dark:bg-gray-200 text-white dark:text-black"
                    size="md"
                    onClick={() => {
                      setIsOpenTwofa(true);
                      console.log(IsOpenTwofa);
                    }}
                  >
                    Setup 2FA
                  </MyButton>
                ) : (
                  <MyButton
                    className="bg-black dark:bg-gray-200 text-white dark:text-black"
                    size="md"
                    onClick={() => {
                      setDisablePopup(true);
                    }}
                  >
                    Disable 2FA
                  </MyButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isOpen && (
          <MyModal
            size="sm"
            isOpen={isOpen}
            backdrop="blur"
            onOpen={() => {}}
            content={
              <div className=" flex flex-col">
                <div className="text-xl font-semibold mb-4 text-center">
                  Are you sure?
                </div>
                <div className="flex gap-2">
                  <MdWarning size={26} className="text-yellow-400" />
                  <p className="text-md text-yellow-400 font-medium mb-4">
                    Changing password will immediately log you out of all
                    devices.
                  </p>
                </div>
              </div>
            }
            onClose={() => {
              setIsOpen(false);
            }}
            title="Change Password"
            button1={
              <MyButton
                className="bg-black dark:bg-gray-200 text-white dark:text-black"
                size="md"
                onClick={handleChangePassword}
              >
                Change Password
              </MyButton>
            }
            button2={
              <MyButton
                className="bg-black dark:bg-gray-200 text-white dark:text-black"
                size="md"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </MyButton>
            }
          />
        )}
      </div>
      <div>
        {IsOpenTwofa && (
          <MyModal
            size="sm"
            isOpen={IsOpenTwofa}
            backdrop="blur"
            onOpen={() => {}}
            content={<CreateTwoFa setIsOpenTwofa={setIsOpenTwofa}  setTwoFaEnabled={setTwoFaEnabled} />}
            onClose={() => {
              setIsOpenTwofa(false);
            }}
            title="Setup 2FA"
            button1={undefined}
            button2={undefined}
          />
        )}
      </div>
      <div>
        {disablePopup && (
          <MyModal
            size="sm"
            isOpen={disablePopup}
            backdrop="blur"
            onOpen={() => {
              setDisablePopup(true);
            }}
            content={
              <div className=" flex flex-col">
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
            onClose={() => {
              setDisablePopup(false);
            }}
            title="Disable 2FA"
            button1={
              <MyButton
                className="bg-black dark:bg-gray-200 text-white dark:text-black"
                size="md"
                onClick={disableTwoFa}
              >
                Disable 2FA
              </MyButton>
            }
            button2={
              <MyButton
                className="bg-black dark:bg-gray-200 text-white dark:text-black"
                size="md"
                onClick={() => {
                  setDisablePopup(false);
                }}
              >
                Cancel
              </MyButton>
            }
          />
        )}
      </div>
    </div>
  );
};

export default Security;
