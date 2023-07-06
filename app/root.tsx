import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getThemeSession } from "./utils/theme.server";

import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
    NonFlashOfWrongThemeEls,
    ThemeProvider,
    useTheme,
} from "./components/theme.provider";
import clsx from "clsx";

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    { rel: "stylesheet", href: tailwindStylesheetUrl, as: "style" },
];

export const loader: LoaderFunction = async ({ request }) => {
    const themeSession = await getThemeSession(request);

    return json({
        theme: themeSession.getTheme(),
    });
};

export default function AppProvider() {
    const data = useLoaderData<typeof loader>();

    return (
        <ThemeProvider specifiedTheme={data.theme}>
            <App />
        </ThemeProvider>
    );
}

function App() {
    const [theme] = useTheme();

    return (
        <html lang="en" className={clsx(theme)}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <Meta />
                <Links />
                <NonFlashOfWrongThemeEls ssrTheme={Boolean(theme)} />
            </head>
            <body className="flex min-h-screen flex-col">
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
