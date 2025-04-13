import React from "react";
import type {AppProps} from "next/app";
import {appWithTranslation} from "next-i18next";
import {HeroUIProvider} from "@heroui/react";
import {AnimatePresence} from "framer-motion";
import {ToastProvider} from "@heroui/toast";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import the CSS for styling the progress bar
import "../styles/style.css";


import {DM_Sans, Mulish} from "next/font/google";
import { TasksProvider } from "@/context/TasksProvider";

NProgress.configure({showSpinner: false});
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// const pageTransition = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1, transition: { duration: 0.5 } },
//   exit: { opacity: 0, transition: { duration: 0.3 } },
// };

const dmSans = DM_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-dm-sans",
});
const mulish = Mulish({subsets: ["latin"], variable: "--font-mulish"});

function MyApp({Component, pageProps}: AppProps) {
    return (
        <HeroUIProvider>
            {/* <TasksProvider> */}
                <AnimatePresence mode="sync">
                    <div key="unique-key" className="your-class">
                        <Component {...pageProps} />
                    </div>
                    <ToastProvider key="toast-provider" />
                </AnimatePresence>
            {/* </TasksProvider> */}
        </HeroUIProvider>
    );
}

export default appWithTranslation(MyApp);
