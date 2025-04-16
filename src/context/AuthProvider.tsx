import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";


interface AuthContextType {
    connected: boolean;
    username: string | null;
    authLoading: boolean;
    role: string | null;
    checkConnection: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: { exp: number } = jwtDecode(token);
        return decoded.exp * 10000 < Date.now();
    } catch {
        return true;
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [role, setRole] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    const checkConnection = async () => {
        setAuthLoading(true);
        try {
            const token = localStorage.getItem("token");

            if (!token || isTokenExpired(token)) {
                logout()
            } else {
                const decoded: { role: string; username: string } = jwtDecode(token);
                setConnected(true);
                setRole(decoded.role ?? null);
                setUsername(decoded.username ?? null);
            }
        } catch (error) {
            console.error("Connection check error:", error);
            setConnected(false);
            setRole(null);
            setUsername(null);
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = async () => {
        localStorage.removeItem("token");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setConnected(false);
        setRole(null);
        setUsername(null);
        await router.push("/login");
    };

    useEffect(() => {
        checkConnection();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                connected,
                username,
                authLoading,
                role,
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
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
