import {FC, ReactNode} from "react";
import {Modal, ModalContent, ModalBody} from "@heroui/react";

interface PopupProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    backdrop?: "blur" | "opaque" | "transparent";
    classNames?: string;
    bodyClassName?: string;
}

const MainModal: FC<PopupProps> = ({
    children,
    isOpen,
    onClose,
    backdrop,
    classNames,
    bodyClassName,
    ...props
}) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} backdrop={backdrop} className={classNames} {...props}>
            <ModalContent className="w-fit max-w-none">
                <ModalBody className={`${bodyClassName}`}>
                    {children}{" "}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default MainModal;
