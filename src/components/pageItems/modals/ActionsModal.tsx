import React, {useState, useMemo} from "react";
import {MainModal} from "@/components/ui/";
import {usePagination} from "@/hooks";
import {Input, Textarea, Select, SelectItem} from "@heroui/react";

interface ActionsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    title: string;
    assignedTo: string;
    description: string;
}

const ActionsModal: React.FC<ActionsModalProps> = ({isOpen, onClose}) => {
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        assignedTo: "",
        description: "",
    });

    const { data, error} = usePagination("/user/getAll");

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
        const requiredFields = [
            "title",
            "description",
            "assignedTo",
        ];
        const isValid = requiredFields.some((field) => !formData[field]);
        setIsDisabled(isValid);
        return isValid;
    }, [formData]);

    const handleSubmit = async () => {
        setLoading(true);

        console.log("Form submitted:", formData);

        setLoading(false);
    };

    return (
        <MainModal isOpen={isOpen} onClose={onClose} title="" backdrop="blur">
            <section className="w-[550px] flex flex-col gap-6 p-4">
                <span className="flex items-center justify-center text-customGreen font-semibold text-2xl">
                    Add Task
                </span>
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
                            onChange={(e) => handleInputChange("assignedTo")(e.target.value)}
                            className="max-w-xs"
                            labelPlacement="outside"
                            items={userItems}
                            label="Favorite Animal"
                            placeholder="Select an animal"
                            radius="lg"
                            size="lg"
                            >
                            {(user: { key: string; label: string }) => (
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
                    <button className="bg-[#F5F7F9] text-red-500 font-semibold py-2.5 px-5 rounded-lg">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isDisabled || loading || formValidation}
                        className="bg-blue-500 text-white font-semibold py-2.5 px-5 rounded-lg">
                        {loading ? "Loading..." : "Add Task"}
                    </button>
                </div>
            </section>
        </MainModal>
    );
};

export default ActionsModal;
