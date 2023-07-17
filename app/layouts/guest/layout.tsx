import { Fragment } from "react";
import { Link, Outlet } from "@remix-run/react";
import { ToggleTheme } from "~/components/toggleTheme";

export default function GuestLayout() {
    return (
        <Fragment>
            <header className="flex items-center justify-between p-4">
                <Link to="/">
                    <span className="text-3xl font-bold tracking-widest">
                        REMIX
                    </span>
                </Link>

                <ToggleTheme />
            </header>
            <Outlet />
            <footer className="mt-auto w-full pb-2 text-center">
                © Copyright 2023 | All Rights Reserved
            </footer>
        </Fragment>
    );
}
