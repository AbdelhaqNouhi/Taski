import React from "react";
import type {AppProps} from "next/app";
import {appWithTranslation} from "next-i18next";
import {HeroUIProvider} from "@heroui/react";
import {AnimatePresence} from "framer-motion";
import {ToastProvider} from "@heroui/toast";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../styles/style.css";


import { TasksProvider } from "@/context/TasksProvider";
import { AuthProvider } from "@/context/AuthProvider";

NProgress.configure({showSpinner: false});
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({Component, pageProps}: AppProps) {
    return (
        <HeroUIProvider>
            <AuthProvider>
                <TasksProvider>
                    <AnimatePresence mode="sync">
                        <div key="unique-key" className="your-class">
                            <Component {...pageProps} />
                        </div>
                        <ToastProvider key="toast-provider" />
                    </AnimatePresence>
                </TasksProvider>
            </AuthProvider>
        </HeroUIProvider>
    );
}

export default appWithTranslation(MyApp);
