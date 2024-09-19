"use client";

import { useRouter } from "next/navigation";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const VerificationLink = () => {
  const router = useRouter();

  return (
    <div
      className="flex items-center cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
      onClick={() => {
        localStorage.setItem("path", window.location.pathname);
        router.push("/verification");
      }}
    >
      <div className="text-lg">Verification</div>
      <FaArrowUpRightFromSquare className="ml-2 text-blue-500 dark:text-blue-300" />
    </div>
  );
};

export default VerificationLink;
