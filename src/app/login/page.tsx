import LoginForm from "@/components/loginform/LoginForm";


const Page = async () =>{
    
        return (
            <div className="p-4 m-0 h-screen overflow-hidden bg-gray-200">
            <div className="bg-white rounded-lg h-full overflow-hidden border border-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
                {/* Left side */}
                <div className="bg-black flex items-center justify-center p-6 md:order-1 order-2">
                  <div className="text-white text-center">
                    <div className="text-5xl font-thin mb-2"></div>
                    <div className="text-lg font-thin">
                     
                    </div> 
                  </div>
                </div>
                {/* Right side */}
                <div className="bg-white flex items-center justify-center p-6 w-full h-full md:order-2 order-1">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      
                      <LoginForm/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
}

export default Page