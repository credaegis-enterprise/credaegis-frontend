
import { MdInfo } from 'react-icons/md';
import { FaUserShield } from 'react-icons/fa';


const InfoPage: React.FC = () => {
    return (
        <div className="h-full  rounded-lg shadow-sm overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-5 h-full">
          <div className="col-span-4">
            <div className="grid grid-rows-2 h-full gap-3 ">
              <div className="row-span-1">
                <div className="flex items-center gap-4 ">
                  <MdInfo size={32} className="text-blue-500" />
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">

                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">

                    </p>
                  </div>
                </div>
              </div>
              <div className="row-span-1">
                <div className="flex  lg:justify-start justify-end lg:ml-12  flex-row lg:items-center gap-2 mt-4 lg:mt-0">
                  
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden border-t border-gray-300 dark:border-stone-600 mt-5 mb-5"></div>
  
          <div className="ml-10 border-l border-gray-300 dark:border-stone-600 mb-5 hidden lg:block lg:w-0.5"></div>
          <div className="col-span-4">
            <div className="grid grid-rows-2 gap-4">
              <div className="row-span-1">
                <div className="flex items-center gap-4">
                  <FaUserShield size={32} className="text-green-500" />
                  <div>
                   
                  </div>
                </div>
              </div>
              <div className="row-span-1">
                <div className="flex lg:justify-start justify-end lg:ml-12 mt-4 lg:mt-0">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
    
      </div>

    );
}


export default InfoPage;