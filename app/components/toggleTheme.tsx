import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Theme, useTheme } from "~/components/theme.provider";
import { Button } from "~/components/ui/button";

export function ToggleTheme() {
    const [theme, setTheme] = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-9 px-0">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    className={theme === Theme.LIGHT ? "bg-gray-100" : ""}
                    onClick={() => setTheme(Theme.LIGHT)}
                >
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={theme === Theme.DARK ? "bg-gray-50/50" : ""}
                    onClick={() => setTheme(Theme.DARK)}
                >
                    Dark
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
