import clsx from "clsx";
import { json } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
    NonFlashOfWrongThemeEls,
    ThemeProvider,
    useTheme,
} from "./components/theme.provider";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import { RemixDevTools } from "remix-development-tools";

import { getThemeSession } from "./utils/theme.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import rdtStylesheet from "remix-development-tools/stylesheet.css";

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    ...(rdtStylesheet ? [{ rel: "stylesheet", href: rdtStylesheet }] : []),
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
