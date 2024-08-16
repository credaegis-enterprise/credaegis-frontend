import LoginForm from "@/components/pageComponents/loginform/loginForm";
import { ThemeSwitcher } from "@/components/themes/themeSwitcher";

const Page = async () => {
  return (
    <div className="p-2 m-0 h-screen overflow-hidden bg-gray-200 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg h-full overflow-hidden border border-gray-300 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
          <div className="bg-neutral-950 dark:bg-zinc-800 flex items-center justify-center p-6 md:order-1 order-2">
            <div className="text-white text-center">
              <div className="text-5xl font-thin mb-2"></div>
              <div className="text- font-thin"></div>
            </div>
          </div>
          
          <div className="md:order-2 order-1 bg-white dark:bg-zinc-950">
            <div className="flex justify-end items-center p-4">
              <ThemeSwitcher />
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
