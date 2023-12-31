import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useFetcher } from "@remix-run/react";

enum Theme {
    DARK = "dark",
    LIGHT = "light",
}

const themes: Array<Theme> = Object.values(Theme);

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const prefersDarkMQ = "(prefers-color-scheme: dark)";
const getPreferredTheme = () =>
    window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT;

function ThemeProvider({
    children,
    specifiedTheme,
}: {
    children: ReactNode;
    specifiedTheme: Theme | null;
}) {
    const [theme, setTheme] = useState<Theme | null>(() => {
        // On the server, if we don't have a specified theme then we should
        // return null and the clientThemeCode will set the theme for us
        // before hydration. Then (during hydration), this code will get the same
        // value that clientThemeCode got so hydration is happy.
        if (specifiedTheme) {
            if (themes.includes(specifiedTheme)) {
                return specifiedTheme;
            } else {
                return null;
            }
        }

        // there's no way for us to know what the theme should be in this context
        // the client will have to figure it out before hydration.
        if (typeof document === "undefined") {
            return null;
        }

        return getPreferredTheme();
    });

    const persistTheme = useFetcher();
    // TODO: remove this when persistTheme is memoized properly
    const persistThemeRef = useRef(persistTheme);
    useEffect(() => {
        persistThemeRef.current = persistTheme;
    }, [persistTheme]);

    const mountRun = useRef(false);

    useEffect(() => {
        if (!mountRun.current) {
            mountRun.current = true;
            return;
        }
        if (!theme) {
            return;
        }

        persistThemeRef.current.submit(
            { theme },
            { action: "action/set-theme", method: "post" },
        );
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia(prefersDarkMQ);
        const handleChange = () => {
            setTheme(mediaQuery.matches ? Theme.DARK : Theme.LIGHT);
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'light'
    : 'dark';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    // this script shouldn't exist if the theme is already applied!
    console.warn(
      "Hi there, could you let us know you're seeing this message? Thanks!",
    );
  } else {
    cl.add(theme);
  }
})();
`;

function NonFlashOfWrongThemeEls({ ssrTheme }: { ssrTheme: boolean }) {
    return (
        <>
            {ssrTheme ? null : (
                <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />
            )}
        </>
    );
}

function isTheme(value: unknown): value is Theme {
    return typeof value === "string" && ["light", "dark"].includes(value);
}

export { isTheme, useTheme, Theme, ThemeProvider, NonFlashOfWrongThemeEls };
