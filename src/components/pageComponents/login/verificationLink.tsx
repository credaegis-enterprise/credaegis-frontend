"use client";

import { useRouter } from "next/navigation";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const VerificationLink = () => {
  const router = useRouter();

  return (
    <div
      className="group flex items-center cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100 "
      onClick={() => {
        localStorage.setItem("path", window.location.pathname);
        router.push("/verification");
      }}
    >
      <div className="flex items-center dark:group-hover:text-green-400 group-hover:text-blue-600    transition-colors duration-300">
        <div className="text-lg">Verification</div>
        <FaArrowUpRightFromSquare className="ml-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-green-400  transition-colors duration-300" />
      </div>
    </div>
  );
  
};

export default VerificationLink;
