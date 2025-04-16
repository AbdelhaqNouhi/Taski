// pages/api/tasks/delete/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded: { role: string; username: string } = jwtDecode(token);
        const { role, username } = decoded;

        if (role === "admin") {
            const response = await api.delete(`/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.status(200).json(response.data);
        }

        const taskResponse = await api.get(`/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (taskResponse.data.assignedTo !== username) {
            return res.status(403).json({ message: "Forbidden: You can only delete your own tasks" });
        }

        const response = await api.delete(`/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error("Delete task error:", error);
        return res.status(error?.response?.status || 500).json({
            message: error?.response?.data?.message || "Internal Server Error",
        });
    }
}
