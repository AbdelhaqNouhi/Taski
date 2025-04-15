import React, {useState, useMemo, useEffect} from "react";
import {MainModal} from "@/components/ui/";
import {usePagination} from "@/hooks";
import {Input, Textarea, Select, SelectItem} from "@heroui/react";
import axios from "axios";
import {useTasksData} from "@/context/TasksProvider";

interface ActionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: string;
    updateData?: FormData; 
}

interface FormData {
    id: string;
    title: string;
    assignedTo: string;
    description: string;
}

const ActionsModal: React.FC<ActionsModalProps> = ({isOpen, onClose, type, updateData}) => {
    
    const {refetch} = useTasksData();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        id: updateData?.id || "", 
        title: "",
        assignedTo: "",
        description: "",
    });
    const {data, loading: dataLoading} = usePagination("/user/getAll");

    const userItems = useMemo(
        () =>
            data?.map((user: any) => ({
                key: user.username,
                label: user.username,
            })) || [],
        [data]
    );

    const handleInputChange = (field: string) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const formValidation = useMemo(() => {
        const requiredFields = ["title", "description", "assignedTo"];
        const isValid = requiredFields.some((field) => !formData[field]);
        setIsDisabled(isValid);
        return isValid;
    }, [formData]);

    const handleAddTask = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("/api/tasks/create", formData, {
                headers: {
                    Authorization: token || "",
                },
            });
            if (response.status === 200) {
                refetch();
                setLoading(false);
                onClose();
            } else {
                setError("Failed to create task");
                setLoading(false);
            }
        } catch (error) {
            setError(error.message || "Failed to create task");
            setLoading(false);
        }
    };

    const handleUpdateTask = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`/api/tasks/update/${updateData.id}`, formData, {
                headers: {
                    Authorization: token || "",
                },
            });

            if (response.status === 200) {
                refetch();
                setLoading(false);
                onClose();
            } else {
                setError("Failed to update task");
                setLoading(false);
            }
        } catch (error) {
            setError(error.message || "Failed to update task");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isOpen) {
            if (type === "update" && updateData) {
                setFormData({
                    id: updateData.id,
                    title: updateData.title || "",
                    assignedTo: updateData.assignedTo || "",
                    description: updateData.description || "",
                });
            } else if (type === "add") {
                setFormData({
                    id: "",
                    title: "",
                    assignedTo: "",
                    description: "",
                });
            }
        }
    }, [isOpen, type, updateData]);

    if (!isOpen) return null;

    
    return (
        <MainModal isOpen={isOpen} onClose={onClose} backdrop="blur">
            <section className="w-[550px] flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <span className="text-customGreen font-semibold text-2xl">
                        {type === "add" ? "Add Task" : "Update Task"}
                    </span>
                    <span className="h-4 text-xs text-red-500">
                        {error}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-4 font-semibold">
                    <div className="grid col-span-1">
                        <Input
                            onChange={(e) =>
                                handleInputChange("title")(e.target.value)
                            }
                            value={formData.title}
                            label="Task title"
                            labelPlacement="outside"
                            name="title"
                            placeholder="What’s in your mind ?"
                            type="text"
                            className=" "
                            radius="lg"
                            size="lg"
                        />
                    </div>
                    <div className="grid col-span-1">
                        <Select
                            onChange={(e) =>
                                handleInputChange("assignedTo")(e.target.value)
                            }
                            selectedKeys={formData.assignedTo ? [formData.assignedTo] : []} 
                            className="max-w-xs"
                            labelPlacement="outside"
                            items={userItems}
                            label="Assign to"
                            placeholder="Assign to"
                            radius="lg"
                            size="lg"
                            isLoading={dataLoading}
                        >
                            {(user: {key: string; label: string}) => (
                                <SelectItem key={user.key}>
                                    {user.label}
                                </SelectItem>
                            )}
                        </Select>
                    </div>
                </div>
                <div className="grid col-span-1 font-semibold">
                    <Textarea
                        onChange={(e) =>
                            handleInputChange("description")(e.target.value)
                        }
                        value={formData.description}
                        label="Description"
                        labelPlacement="outside"
                        name="description"
                        placeholder="What’s in your mind ?"
                        type="text"
                        className=" "
                        radius="lg"
                        size="lg"
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="bg-[#F5F7F9] text-red-500 font-semibold py-2.5 px-5 rounded-lg"
                    >
                        Cancel
                    </button>
                    {type === "add" ? (
                        <button
                            onClick={handleAddTask}
                            disabled={isDisabled || loading || formValidation}
                            className="bg-blue-500 text-white font-semibold py-2.5 px-5 rounded-lg"
                        >
                            {loading ? "Loading..." : "Add Task"}
                        </button>
                    ): (
                        <button
                            onClick={handleUpdateTask}
                            disabled={isDisabled || loading || formValidation}
                            className="bg-blue-500 text-white font-semibold py-2.5 px-5 rounded-lg"
                        >
                            {loading ? "Loading..." : "Save"}
                        </button>
                    )}
                </div>
            </section>
        </MainModal>
    );
};

export default ActionsModal;
