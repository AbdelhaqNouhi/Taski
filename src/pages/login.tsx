import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";
import {Input} from "@heroui/react";
import { EyeSlashIcon } from "@heroicons/react/16/solid";
import { EyeIcon } from "@heroicons/react/24/solid";
import { useTasksData } from '@/context/TasksProvider';

const Login = () => {
    const { refetch } = useTasksData();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [authLoading, setAuthLoading] = useState(false);
    const router = useRouter();
    const { checkConnection } = useAuth();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/auth/login", formData);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.user.token);
                await checkConnection();
                await refetch();
                router.push("/tasks");
            } else {
                console.error("Login failed:", response.data.message);
            }
        } catch (error) {
            setError(error?.response?.data?.message || "Login failed");
            setTimeout(() => {
                setError("");
            }, 10000);
        } finally {
            setAuthLoading(false);
        }
    };

    const handleInputChange = (field: string) => (value: string) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    return (
        <article className="flex h-screen bg-[#F4F7FE]/80">
            <div className="m-auto flex w-full max-w-[450px] flex-col gap-12 items-center justify-center rounded-3xl bg-white px-8 py-6 shadow-md shadow-[#0000001A]">
                <div className=" flex gap-2 items-center">
                    <Image
                        src="/assets/images/logo.svg"
                        alt="logo"
                        height={25}
                        width={25}
                    />
                    <span className=" font-semibold text-lg">Taski</span>
                </div>
                <form onSubmit={handleAuth} className="w-full">
                    <h1 className="mb-4 text-3xl py-4 font-semibold flex justify-center">Login</h1>
                    <div className="flex flex-col gap-6">
                        <Input
                            onChange={(e) => handleInputChange("username")(e.target.value)}
                            value={formData.username}
                            label="username"
                            labelPlacement="outside"
                            name="username"
                            placeholder="Enter your username"
                            type="text"
                            className=" font-semibold text-3xl"
                            radius="md"
                            size="lg"
                        />
                        <Input
                            onChange={(e) => handleInputChange("password")(e.target.value)}
                            value={formData.password}
                            label="password"
                            labelPlacement="outside"
                            name="password"
                            placeholder="Enter your password"
                            type={isVisible ? "text" : "password"}
                            className=" font-semibold text-3xl relative"
                            radius="md"
                            size="lg"
                            endContent={
                                <span className="absolute right-4  cursor-pointer" onClick={toggleVisibility}>
                                    {isVisible ? <EyeIcon className="h-5 w-5 text-gray-500" /> : <EyeSlashIcon className="h-5 w-5 text-gray-500" />}
                                </span>
                            }
                        />
                        <div className="flex flex-col gap-1 h-14">
                            <button
                                disabled={authLoading}
                                className="font-semibold rounded-xl bg-blue-500 py-3 text-white hover:bg-blue-600"
                            >
                                {authLoading ? "Logging in..." : "Login"}
                            </button>
                            <div className="flex justify-center items-center text-sm text-gray-500">
                                {error && <p className="text-sm  text-red-600">{error}</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </article>
    );
};

export default Login;
