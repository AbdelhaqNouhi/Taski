// context/TasksProvider.tsx
import React, { createContext, useContext } from "react";
import { Tasks } from "@/types";
import { usePagination } from "@/hooks";


interface TasksContextType {
    data: Tasks[];
    error: string | null;
    loading: boolean;
}

const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data, error, loading } = usePagination("/tasks/getAll"); 
    console.log("Tasks data:", data); // Debugging line
    
    return (
        <TasksContext.Provider value={{ data, error, loading }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasksData = () => {
    const context = useContext(TasksContext);
    if (!context) throw new Error("useTasksData must be used within a TasksProvider");
    return context;
};
