
import { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
        const response = await api.get("/users", {
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
