import React, { useState } from "react";
import Image from "next/image";
import { Input, useDisclosure } from "@heroui/react";
import { ActionsModal } from "@/components/pageItems/modals";
import { useAuth } from "@/context/AuthProvider";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useTasksData } from "@/context/TasksProvider";

interface TaskLayoutProps {
    children: (search: string) => React.ReactNode;
}

export const TaskLayout: React.FC<TaskLayoutProps> = ({ children }) => {
    const [search, setSearch] = useState<string>("");
    const addTaskModal = useDisclosure();
    const { role } = useAuth();
    const { data } = useTasksData();

    return (
        <section className="">
            <div className="w-full flex flex-col gap-2">
                <div className="flex items-center md:justify-between gap-1">
                    {data.length > 0 && (
                        <div className="md:w-[250px] w-[210px]">
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                isClearable
                                onClear={() => setSearch("")}
                                placeholder="Type to search..."
                                radius="lg"
                                startContent={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    )}
                    {role === "admin" && (
                        <button
                            onClick={addTaskModal.onOpen}
                            className="flex items-center ml-auto md:mr-4 py-2.5 gap-2 text-[#8D9CB8] font-semibold cursor-pointer hover:bg-[#F5F7F9] rounded-lg px-3"
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
                <ActionsModal
                    isOpen={addTaskModal.isOpen}
                    onClose={addTaskModal.onOpenChange}
                    type="add"
                />
                <section className="h-full">{children(search)}</section>
            </div>
        </section>
    );
};
