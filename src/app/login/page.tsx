import Image from "next/image";
import LoginForm from "@/components/pageComponents/login/loginForm";
import { ThemeSwitcher } from "@/components/themes/themeSwitcher";
import VerificationLink from "@/components/pageComponents/login/verificationLink";

const Page = () => {
  return (
    <div className="p-2 m-0 h-screen overflow-hidden">
      <div className="bg-white dark:bg-gray-800 rounded-lg h-full overflow-hidden border border-gray-300 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
          {/* Left Side (Image) */}
          <div className="bg-neutral-950 dark:bg-zinc-800 flex items-center justify-center p-0 md:order-1 order-2 relative">
            {/* Light Mode Logo */}
            <Image
              src="/Logo1.png"
              alt="Light Mode Illustration"
              fill
              className="object-cover block dark:hidden"
              priority
            />
            {/* Dark Mode Logo */}
            <Image
              src="/Logo2.png"
              alt="Dark Mode Illustration"
              fill
              className="object-cover hidden dark:block"
              priority
            />
          </div>

          {/* Right Side (Login Form & Controls) */}
          <div className="md:order-2 order-1 bg-white dark:bg-zinc-950 flex flex-col">
            <div className="flex justify-end items-center p-4">
              <div className="flex items-center gap-10 p-2">
                <VerificationLink />
                <ThemeSwitcher />
              </div>
            </div>
            <div className="flex flex-grow items-center justify-center p-6 w-full">
              <div className="w-full max-w-md">
                <div className="flex flex-col gap-4">
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
