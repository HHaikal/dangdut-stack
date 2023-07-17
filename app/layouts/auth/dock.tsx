import { useRef } from "react";
import type { ReactNode } from "react";
import { Link } from "@remix-run/react";
import type { MotionValue } from "framer-motion";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "~/components/ui/tooltip";

export function Dock() {
    const mouseY = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseY.set(e.pageY)}
            onMouseLeave={() => mouseY.set(Infinity)}
            className="flex w-20 flex-col gap-4 rounded-full bg-gray-300 px-4 py-6 dark:border dark:border-white dark:bg-inherit"
        >
            <MenuItem mouseY={mouseY} tooltip="Dashboard" to="/dashboard">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="m-auto h-7 w-7 fill-current text-black"
                >
                    <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm9-8.586 6 6V15l.001 5H6v-9.585l6-6.001z"></path>
                    <path d="M12 17c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path>
                </svg>
            </MenuItem>
        </motion.div>
    );
}

type MenuItemProps = {
    mouseY: MotionValue;
    tooltip: string;
    to: string;
    children: ReactNode;
};

function MenuItem({ mouseY, tooltip, to, children }: MenuItemProps) {
    let ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseY, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? {
            y: 0,
            height: 0,
        };
        return val - bounds.y - bounds.height / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [50, 65, 50]);
    let width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link to={to}>
                        <motion.div
                            ref={ref}
                            style={{ width }}
                            className="flex aspect-square h-full w-full items-center rounded-full bg-white"
                        >
                            {children}
                        </motion.div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-5">
                    <span>{tooltip}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
