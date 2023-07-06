import { Fragment } from "react";
import { Outlet } from "@remix-run/react";
import { Switch } from "~/components/ui/switch";
import { Theme, useTheme } from "~/components/theme.provider";

export default function BasicLayout() {
    const [theme, setTheme] = useTheme();

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        );
    };

    return (
        <Fragment>
            <header className="flex items-center justify-between p-2">
                <span className="text-3xl font-bold tracking-widest">
                    REMIX
                </span>

                <Switch
                    onCheckedChange={toggleTheme}
                    checked={theme === "dark"}
                />
            </header>
            <Outlet />
            <footer className="mt-auto w-full pb-2 text-center">
                © Copyright 2023 | All Rights Reserved
            </footer>
        </Fragment>
    );
}
