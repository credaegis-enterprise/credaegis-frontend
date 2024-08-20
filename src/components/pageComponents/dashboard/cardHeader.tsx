'use client'

import { MyButton } from "@/components/buttons/mybutton";
import MyModal from "@/components/modals/mymodal";
import  { useState } from "react";


interface CardHeaderProps {
    title : string;
    icon?: React.ReactNode;
    buttonTitle?: string;
    modalContent?: React.ReactNode;
    modalTitle: string;
}

const CardHeader:React.FC<CardHeaderProps> = ({title,icon,buttonTitle,modalContent,modalTitle}) => {

    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="relative">
        <div className="flex justify-around gap-4">
        <div className="flex gap-2">
        {icon}
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{title}</h2>
            
        </div>
        {buttonTitle &&  <MyButton
          className="bg-black dark:bg-white"
          size="sm"
          onClick={() => {
            setIsOpen(true);
          } }

         
        >
          <span className="dark:text-black text-white text-md font-medium">
            Add
          </span>
        </MyButton>}
        </div>
        {isOpen && <MyModal
        size="sm"
        isOpen={isOpen}
        backdrop="blur"
        onClose={() => {
          setIsOpen(false);
        }}
        onOpen={() => {
          setIsOpen(true);
        }}
        title={modalTitle}
        content={modalContent}
        button1={<button onClick={() => setIsOpen(false)}>Close</button>}
        button2={undefined}
        />}

        </div>
    )

}


export default CardHeader;