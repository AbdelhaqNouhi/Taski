import dynamic from "next/dynamic";

const TaskCard = dynamic(() => import("./TaskCard"), {
    ssr: false,
});

export { TaskCard };