import React, {useState} from "react";
import {MainLayout} from "@/components";
import {TaskLayout} from "@/components";
import {useTasksData} from "@/context/TasksProvider";
import {TaskCard} from "@/components/pageItems/tasks";;

const TasksContent = () => {
    const {data, loading} = useTasksData();
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;
    const totalPages = Math.ceil(data.length / tasksPerPage);
    const currentTasks = data.slice(
        (currentPage - 1) * tasksPerPage,
        currentPage * tasksPerPage
    );
    console.log();
    

    return (
        <div className="">
            {!loading && data.length === 0 && (
                <span className="text-lg font-semibold flex justify-center items-center">
                    No tasks available
                </span>
            )}
            {loading && data.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                    <span className="text-lg font-semibold">Loading...</span>
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    <section className="flex flex-col gap-4 h-[370px] overflow-y-auto">
                        {currentTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                status={task.status}
                                assignedTo={task.assignedTo}
                            />
                        ))}
                    </section>
                    <div className="flex justify-center gap-2">
                        {Array.from({length: totalPages}, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 rounded ${
                                    currentPage === i + 1
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const Tasks = () => {
    return (
        <MainLayout>
            <TaskLayout>
                <TasksContent />
            </TaskLayout>
        </MainLayout>
    );
};
export default Tasks;
