import { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const response = await api.post("/tasks", req.body, {
            headers: {
                Authorization: req.headers.authorization || "",
            }
        });

        console.log("response", response.data);
        

        res.status(200).json(response.data);
        return req.headers.authorization || ""
        
    } catch (error) {
        console.log(error)
        res.status(error.response?.status || 500).json({ message: error.message });
    }
}
