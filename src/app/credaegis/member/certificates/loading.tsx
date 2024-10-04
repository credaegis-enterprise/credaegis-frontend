
import { Spinner } from "@nextui-org/react"

const Loading = () => {
    return (
        <div className="flex h-full justify-center items-center">
            <Spinner size="lg" color="current" className="text-dark dark:text-white" />
        </div>
    )

}

export default Loading