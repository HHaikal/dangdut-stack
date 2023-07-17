import { Dock } from "./dock";
import { Fragment } from "react";
import { Form, Link, Outlet } from "@remix-run/react";
import { ToggleTheme } from "~/components/toggleTheme";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function AuthLayout() {
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

                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center justify-center gap-2 rounded-full bg-gray-100 p-2 dark:bg-gray-100/20">
                            <div className="h-5 w-5 rounded-full bg-black dark:bg-white"></div>

                            <span className="hidden lg:block">Fullname</span>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Form
                                    action="/signout"
                                    method="POST"
                                    className="w-full"
                                >
                                    <button type="submit" className="w-full">
                                        Logout
                                    </button>
                                </Form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <div className="flex flex-1 gap-4 p-4 pt-0">
                <nav className="hidden flex-col items-center lg:flex">
                    <Dock />
                </nav>

                <Outlet />
            </div>
        </Fragment>
    );
}
