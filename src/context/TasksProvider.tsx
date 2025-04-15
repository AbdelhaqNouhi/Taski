import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {Tasks} from "@/types";

interface TasksContextType {
    data: Tasks[];
    error: string | null;
    loading: boolean;
    refetch: () => void;
}

const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider: React.FC<{children: React.ReactNode}> = ({
    children,
}) => {
    const [data, setData] = useState<Tasks[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get("/api/tasks/getAll", {
                headers: {Authorization: token || ""},
            });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message || "Something went wrong");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TasksContext.Provider value={{data, error, loading, refetch: fetchTasks}}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasksData = () => {
    const context = useContext(TasksContext);
    if (!context)
        throw new Error("useTasksData must be used within a TasksProvider");
    return context;
};
