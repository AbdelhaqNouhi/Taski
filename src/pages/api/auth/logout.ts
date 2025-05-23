import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.setHeader(
            "Set-Cookie",
            [
                serialize("token", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/",
                    maxAge: 0,
                }),
            ]
        );
        
        return res.status(200).json({
            message: "Logout successful",
        });

    } catch (error) {
        console.error("🔴 Logout failed:", error.message);
        return res.status(500).json({
            message: "Logout failed",
            error: error.message || "Unknown error",
        });
    }
}
