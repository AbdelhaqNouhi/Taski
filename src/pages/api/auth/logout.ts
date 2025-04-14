import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie"; // Use destructuring to access serialize function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.setHeader(
            "Set-Cookie",
            [
                serialize("token", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Use secure flag in production
                    sameSite: "strict",
                    path: "/",
                    maxAge: 0,
                }),
            ]
        );
        
        return res.status(200).json({
            message: "Logout successful",
        });

    } catch (error: any) {
        console.error("🔴 Logout failed:", error.message);

        return res.status(500).json({
            message: "Logout failed",
            error: error.message || "Unknown error",
        });
    }
}
