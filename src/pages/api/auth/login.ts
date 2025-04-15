import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import api from "@/lib/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { username, password } = req.body;

    try {
        const response = await api.post("/login", { username, password });

        const token = response.data?.user?.token;
        const role = response.data?.user?.role;
        
        if (!token) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.setHeader("Set-Cookie", serialize("token", token,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/",
        }));

        return res.status(200).json({
            message: "Login successful",
            user: {
                username: response.data?.user?.username,
                role: role,
                token: token,
            },
        });

    } catch (error) {
        return res.status(error?.response?.status || 500).json({
            message: error?.response?.data?.message || "Internal Server Error",
        });
    }
}
