

import VerifyCertificates from "@/components/pageComponents/verification/verifyCertificates";

const page = () => {
  return (
    <div className="flex flex-col h-screen p-2">
          <div className="p-2 h-full bg-gray-50 dark:bg-black transition-colors duration-300 ">
            
            
                <div className="flex flex-col h-full w-full overflow-hidden  ">
                    <VerifyCertificates />

                </div>

          </div>
    
    </div>
  );
};

export default page;
