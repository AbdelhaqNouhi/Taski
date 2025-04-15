import React from 'react'
import { PencilIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useDisclosure } from '@heroui/react';
import {ActionsModal} from "@/components/pageItems/modals";

interface CardProps {
    id: string;
    title: string;
    description: string;
    status: string;
    assignedTo: string;
}
const TaskCard = ({id, title, description, status, assignedTo }: CardProps) => {

    const selectedTask = {
        id: id,
        title: title,
        description: description,
        assignedTo: assignedTo
    }
    const updateTaskModal = useDisclosure();

    return (
        <>
            <div className='bg-[#F5F7F9] grid grid-cols-2 grid-col shadow-md rounded-2xl px-5 py-3 h-24'>
                <div className='flex flex-col'>
                    <span className=' text-blue-500 text-sm'>
                        @{assignedTo}
                    </span>
                    <span className='font-bold'>
                        {title}
                    </span>
                    <span className='text-[#8D9CB8] text-sm truncate max-w-[300px]'>
                        {description}
                    </span>
                </div>
                <div className='flex flex-col gap-2 justify-center items-end'>
                    <div className='flex gap-3'>
                        <button onClick={updateTaskModal.onOpen} className='p-1 relative'>
                            <PencilIcon className='h-5 w-5 text-[#8D9CB8]' />
                            <span className='border w-1.5 ml-2.5 absolute top-6 border-[#8D9CB8] flex'></span>
                        </button>
                        <ActionsModal isOpen={updateTaskModal.isOpen} onClose={updateTaskModal.onOpenChange} type="update" updateData={selectedTask} />
                        <button className=''>
                            <TrashIcon className='h-5 w-5 text-red-500' />
                        </button>
                        <button className='bg-blue-500 flex gap-2 items-center rounded-lg py-1.5 px-3 '>
                            <CheckCircleIcon className='h-5 w-5 font-bold text-white' />
                            <span className='text-white font-semibold pb-0.5'>{status}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TaskCard