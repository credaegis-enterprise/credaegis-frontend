'use client'

import { MyButton } from "@/components/buttons/mybutton";


interface CardHeaderProps {
    title : string;
    icon?: React.ReactNode;
    buttonTitle?: string;
}

const CardHeader:React.FC<CardHeaderProps> = ({title,icon,buttonTitle}) => {
    return(
        <div className="flex justify-around gap-4">
        <div className="flex gap-2">
        {icon}
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{title}</h2>
            
        </div>
        {buttonTitle &&  <MyButton
          className="bg-black dark:bg-white"
          size="sm"
         
        >
          <span className="dark:text-black text-white text-md font-medium">
            Add
          </span>
        </MyButton>}
        </div>
    )

}


export default CardHeader;