import { createCookieSessionStorage } from "@remix-run/node";

import { isTheme } from "~/components/theme.provider";
import type { Theme } from "~/components/theme.provider";

const sessionSecret = "s3cret";

const themeStorage = createCookieSessionStorage({
    cookie: {
        name: "theme-cookie",
        secure: true,
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        httpOnly: true,
    },
});

async function getThemeSession(request: Request) {
    const session = await themeStorage.getSession(
        request.headers.get("Cookie")
    );
    return {
        getTheme: () => {
            const themeValue = session.get("theme");
            return isTheme(themeValue) ? themeValue : "dark";
        },
        setTheme: (theme: Theme) => session.set("theme", theme),
        commit: () => themeStorage.commitSession(session),
    };
}

export { getThemeSession };
