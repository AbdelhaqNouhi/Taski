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


export type PaginationProps ={
    currentPage: number;
    totalPages: number;
    totalElements: number;
    page: number;
    size: number;
    first: boolean;
    last: boolean;
}