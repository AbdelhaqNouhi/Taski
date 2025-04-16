import React from 'react'
import { PencilIcon, TrashIcon, CheckCircleIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useDisclosure } from '@heroui/react';
import {ActionsModal} from "@/components/pageItems/modals";
import axios from 'axios';
import { useTasksData } from '@/context/TasksProvider';
import { useAuth } from '@/context/AuthProvider';

interface CardProps {
    id: string;
    title: string;
    description: string;
    status: string;
    assignedTo: string;
}
const TaskCard = ({id, title, description, status, assignedTo }: CardProps) => {

    const token = localStorage.getItem("token");
    const {role} = useAuth();
    const isAdmin = role === "admin";
    const isDone = status === "done";
    const selectedTask = {
        id: id,
        title: title,
        description: description,
        assignedTo: assignedTo
    }
    const {refetch} = useTasksData();

    const updateTaskModal = useDisclosure();


    const handleDeleteTask = async () => {
        try {
            const response = await axios.delete(`/api/tasks/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                refetch();
                console.log("Task deleted successfully");
            } else {
                console.error("Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    const handleUpdateStatus = async () => {
        try {
            const response = await axios.put(`/api/tasks/update/${id}`, { status: "done" }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                refetch();
                console.log("Task status updated successfully");
            } else {
                console.error("Failed to update task status");
            }
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    }

    return (
        <>
            <div className='group cursor-pointer bg-[#F5F7F9] grid grid-cols-2 grid-col shadow-md rounded-2xl px-5 py-2 h-20'>
                <div className='flex gap-4 items-center'>
                    {isDone && (
                        <CheckIcon className='h-5 w-5 text-blue-500' strokeWidth={3}/>
                    )}
                    <div className='flex flex-col'>
                        <span className=' text-blue-500 text-sm'>
                            @{assignedTo}
                        </span>
                        <span className={`font-bold ${isDone && "line-through"}`}>
                            {title}
                        </span>
                        <span className={`text-[#8D9CB8] text-sm truncate max-w-[300px] ${isDone && "line-through"}`}>
                            {description}
                        </span>
                    </div>
                </div>
                {/* action */}
                <div className='flex flex-col gap-2 justify-center items-end group-hover:flex hidden'>
                    <div className='flex gap-3'>
                        {!isDone && (
                            <button onClick={updateTaskModal.onOpen} className='p-1 relative'>
                                <PencilIcon className='h-5 w-5 text-[#8D9CB8]' />
                                <span className='border w-1.5 ml-2.5 absolute top-6 border-[#8D9CB8] flex'></span>
                            </button>
                        )}
                        <ActionsModal isOpen={updateTaskModal.isOpen} onClose={updateTaskModal.onOpenChange} type="update" updateData={selectedTask} />
                        {isAdmin && (
                            <button onClick={handleDeleteTask} className='p-1 relative'>
                                <TrashIcon className='h-5 w-5 text-red-500' />
                                <span className='border w-1.5 ml-2.5 absolute top-6'></span>
                            </button>
                        )}
                        {!isDone && (
                            <button onClick={handleUpdateStatus} className='bg-blue-500 flex gap-2 items-center rounded-lg py-1.5 px-3 '>
                                <CheckCircleIcon className='h-5 w-5 font-bold text-white' />
                                <span className='text-white font-semibold pb-0.5'>
                                    {status === "in_progress" || status === "open" && "Done"}
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default TaskCard