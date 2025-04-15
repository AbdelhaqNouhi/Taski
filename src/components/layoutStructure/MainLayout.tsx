import React, { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { useTasksData } from "@/context/TasksProvider";

interface MainLayoutProps {
    children: ReactNode;
    role?: string | null;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, role }) => {
    const { data, loading } = useTasksData();
    
    return (
        <section className="flex min-h-screen">
            <div className="flex flex-col gap-2 w-full min-h-screen justify-between px-16 ">
                <div className="flex flex-col gap-12">
                    <section className="flex justify-between pt-8">
                        <Header role={role} />
                    </section>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className=" font-bold text-3xl ">Welcome,</span>
                            <span className="font-bold text-blue-500 text-3xl">{role}.</span>
                        </div>
                        <span className="text-[#8D9CB8]">Your team got {data.length} tasks to do.</span>
                    </div>
                </div>
                <section className="h-full">{children}</section>
            </div>
        </section>
    );
};
