import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";

export const usePagination = (endpoint: string) => {
    const [data, setData] = useState<any | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { connected, authLoading } = useAuth();
    
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api${endpoint}`);
            if (!response.data) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = response.data;
            
            setData(result || []);
        } catch (error: any) {
            setError(error?.response?.data?.status || error.statusText || "Something went wrong");
            console.error("API Error:", error?.response || error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (!connected || authLoading) return;
        fetchData();
    }, [connected, authLoading]);

    return { data, loading, error };
};

