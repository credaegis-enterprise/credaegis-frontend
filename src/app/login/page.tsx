import LoginForm from "@/components/pageComponents/login/loginForm";
import { ThemeSwitcher } from "@/components/themes/themeSwitcher";
import VerificationLink from "@/components/pageComponents/login/verificationLink";
import Spline from "@splinetool/react-spline/next";

const Page = () => {
  return (
    <div className="p-2 m-0 h-screen overflow-hidden">
      <div className="bg-white dark:bg-gray-800 rounded-lg h-full overflow-hidden border border-gray-300 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
          
          {/* Left Side - Spline Animation with Overlay Text */}
          <div className="relative w-full h-full md:order-1 order-2">
            {/* Spline Animation */}
            <Spline
              scene="https://prod.spline.design/IeQ8uvEFrruysj-6/scene.splinecode"
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />

            {/* Overlay Text */}
            <div className="absolute bottom-10 left-0 w-full flex flex-col items-center text-white text-center py-4">
              <div className="text-3xl font-bold mb-2">Credaegis</div>
              <div className="text-2xl font-medium">Secure your documents from Anywhere.</div>
            </div>
          </div>

          {/* Right Side - Login Section */}
          <div className="md:order-2 order-1 bg-white dark:bg-zinc-950">
            <div className="flex justify-end items-center p-4">
              <div className="flex items-center gap-10 p-2">
                <div className="flex items-center">
                  <VerificationLink />
                </div>
                <div className="flex items-center">
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 w-full h-full">
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
