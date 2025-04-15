import dynamic from "next/dynamic";

const ActionsModal = dynamic(() => import("./ActionsModal"), {
    ssr: false,
});

export {ActionsModal};