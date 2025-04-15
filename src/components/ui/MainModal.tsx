import {FC, ReactNode} from "react";
import {Modal, ModalContent, ModalBody} from "@heroui/react";

interface PopupProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    backdrop?: "blur" | "opaque" | "transparent";
    classNames?: string;
    titleClassName?: string;
    bodyClassName?: string;
    [x: string]: any;
}

const MainModal: FC<PopupProps> = ({
    children,
    isOpen,
    onClose,
    backdrop,
    classNames,
    titleClassName,
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
