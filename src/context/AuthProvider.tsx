// context/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "@/lib/axiosInstance";
import { jwtDecode } from "jwt-decode";


interface AuthContextType {
    connected: boolean;
    username: string | null;
    loading: boolean;
    role: string | null;
    checkConnection: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: { exp: number } = jwtDecode(token);
        return decoded.exp * 1000 < Date.now(); // Convert `exp` from seconds to milliseconds
    } catch {
        return true; // If decoding fails, assume token is invalid
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [connected, setConnected] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
    
            if (!token || isTokenExpired(token)) {
                setConnected(false);
                setRole(null);
                setUsername(null);
                return;
            }
    
            const decoded: any = jwtDecode(token);
            setConnected(true);
            setRole(decoded.role);
            setUsername(decoded.username);
        } catch (error) {
            console.log("Connection check error:", error);
            setConnected(false);
            setRole(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("token");
        setConnected(false);
        await router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                username,
                role,
                connected,
                loading,
                checkConnection,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
