import { Fragment } from "react";
import { ToggleTheme } from "~/components/toggleTheme";
import { ShowComponent } from "~/components/ShowComponent";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export default function BasicLayout() {
    const { isAuthenticated } = useLoaderData();

    return (
        <Fragment>
            <header className="flex items-center justify-between p-4">
                <Link to="/">
                    <span className="text-3xl font-bold tracking-widest">
                        REMIX
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <ToggleTheme />

                    <ShowComponent isShow={isAuthenticated}>
                        {({ isShow }) => {
                            if (isShow) {
                                return (
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center gap-2 rounded-full bg-gray-100/20 p-2"
                                    >
                                        <div className="h-5 w-5 rounded-full bg-black dark:bg-white"></div>

                                        <span className="hidden lg:block">
                                            Dashboard
                                        </span>
                                    </Link>
                                );
                            }

                            return (
                                <Link
                                    to="/signin"
                                    className="flex items-center gap-2 rounded-full bg-gray-500/20 p-2 px-6"
                                >
                                    <span>Masuk</span>
                                </Link>
                            );
                        }}
                    </ShowComponent>
                </div>
            </header>
            <Outlet />
            <footer className="mt-auto w-full pb-2 text-center">
                © Copyright 2023 | All Rights Reserved
            </footer>
        </Fragment>
    );
}
