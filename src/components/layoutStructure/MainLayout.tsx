import React, { ReactNode } from "react";
import { Header } from "./Header";
import { useTasksData } from "@/context/TasksProvider";
import { useAuth } from "@/context/AuthProvider";

interface MainLayoutProps {
    children: ReactNode;
    username?: string | null;
    role?: string | null;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { data } = useTasksData();
    const {username, role} = useAuth();
    
    
    return (
        <section className="flex min-h-screen">
            <div className="flex flex-col gap-9 w-full min-h-screen justify-between px-16 ">
                <div className="flex flex-col gap-12">
                    <section className="flex justify-between pt-8">
                        <Header role={role} username={username} />
                    </section>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className=" font-bold text-3xl ">Welcome,</span>
                            <span className="font-bold text-blue-500 text-3xl">{username}.</span>
                        </div>
                        {role === "admin" ? (
                            <span className="text-[#8D9CB8]">Your team got {data.length} tasks to do.</span>
                        ): (
                            <span className="text-[#8D9CB8]">You’ve got {data.length} tasks to do.</span>
                        )}
                    </div>
                </div>
                <section className="h-full">{children}</section>
            </div>
        </section>
    );
};
