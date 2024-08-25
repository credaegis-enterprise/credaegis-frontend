import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

interface MyModalProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; 
  isOpen: boolean;
  title: string;
  backdrop: "static" | "blur" | "opaque" | "transparent" | undefined;
  content: React.ReactNode;
  button1: React.ReactNode;
  button2: React.ReactNode;
  onClose: () => void;
  onOpen: () => void;
}
const MyModal: React.FC<MyModalProps> = ({ size, isOpen, onClose, onOpen,content,title,backdrop,button1,button2 }) => {


  return (
    <>
      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">{title}</ModalHeader>
          <ModalBody>
        {content}
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-center w-full gap-2">
            {button1}
            {button2}
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MyModal;
