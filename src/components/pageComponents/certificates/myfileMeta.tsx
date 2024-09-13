
import { Input } from "@nextui-org/react"
import { AiFillCheckCircle } from "react-icons/ai"


const MyFileMeta = () => {
    return (
        <div className="h-full w-full flex flex-col gap-2 ">
        <div className="flex justify-between p-2">
          <div className="flex gap-2 mt-1 ">
            <AiFillCheckCircle size={26} />
            <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Fill information 
            </div>
            <div className="ml-3 text-xl font-medium text-gray-800 dark:text-green-400">
             0/10
            </div>
        </div>
        </div>
        </div>
    )
}

export default MyFileMeta