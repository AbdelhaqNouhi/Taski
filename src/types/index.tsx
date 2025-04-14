export interface User {
    id: string;
    fullName: string;
    username: string;
    password: string;
    role: "admin" | "user";
}

export interface Tasks {
    id: string;
    title: string;
    description: string;
    status: "in_progress" | "completed";
    assignedTo: string;
}