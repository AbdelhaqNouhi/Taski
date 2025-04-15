import React, {ReactNode} from "react";
import Image from "next/image";
import {useDisclosure} from "@heroui/react";
import {ActionsModal} from "@/components/pageItems/modals";
import { useAuth } from "@/context/AuthProvider";

interface MainLayoutProps {
    children: ReactNode;
    role?: string | null;
}

export const TaskLayout: React.FC<MainLayoutProps> = ({children}) => {

    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const addTaskModal = useDisclosure();
    const {role} = useAuth();
    
    return (
        <section className="">
            <div className="w-full flex flex-col gap-3">
                <div className="h-14">
                    {role === "admin" && (
                        <button
                            onClick={addTaskModal.onOpen}
                            className="flex items-center ml-auto py-4 gap-2 text-[#8D9CB8] font-semibold cursor-pointer hover:bg-[#F5F7F9] rounded-lg px-3"
                        >
                            <Image
                                src="/assets/icons/addTask.svg"
                                alt="logo"
                                height={25}
                                width={25}
                            />
                            <span>Add a new task...</span>
                        </button>
                    )}
                </div>
                <ActionsModal isOpen={addTaskModal.isOpen} onClose={addTaskModal.onOpenChange} type="add"/>
                <section className="h-full">{children}</section>
            </div>
        </section>
    );
};
