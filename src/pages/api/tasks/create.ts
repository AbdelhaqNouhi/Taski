// pages/api/tasks/create.ts
import { NextApiRequest, NextApiResponse } from "next";
import { jwtDecode } from "jwt-decode";
import { checkPermission } from "@/utils/permissions"; // Import the permissions config
import api from "@/lib/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded: { role: string } = jwtDecode(token);
        const { role } = decoded;

        // Check if the role is allowed to perform the "create" action
        if (!checkPermission(role)?.create) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to create tasks" });
        }

        // Proceed with the task creation logic
        const response = await api.post("/tasks", req.body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(error?.response?.status || 500).json({
            message: error?.response?.data?.message || "Internal Server Error",
        });
    }
}
