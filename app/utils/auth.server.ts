import type { User } from "~/models/user";
import { Authenticator } from "remix-auth";
import { redirect } from "@remix-run/node";
import { FormStrategy } from "remix-auth-form";
import type { Headers } from "@remix-run/node";
import { sessionStorage } from "./session.server";

type IKey = {
    access_token: string;
    refresh_token: string;
};

export type Policy<PolicyResult> = (
    request: Request,
    callback: (props: PolicyResult) => any
) => Promise<any>;

export const authenticated: Policy<{ user: User; header: Headers }> = async (
    request,
    callback
) => {
    // const result = await getProfile(request);
    // if (result.isLeft()) {
    //     return authenticator.logout(request, { redirectTo: "/signin" });
    // } else {
    //     return callback({
    //         user: result.value,
    //         header: new Headers(),
    //     });
    // }
};

export const sessionShouldExist: Policy<any> = async (request, callback) => {
    const session = await authenticator.isAuthenticated(request);

    if (session) {
        return callback({});
    } else {
        const url = new URL(request.url);
        const currentUrl = url.pathname + url.search;
        return authenticator.logout(request, {
            redirectTo: `/signin?returnTo=${currentUrl}`,
        });
    }
};

export const isAuthenticated: Policy<{
    isAuthenticated: boolean;
}> = async (request, callback) => {
    const isAuthenticated = await authenticator.isAuthenticated(request);

    return callback({
        isAuthenticated: Boolean(isAuthenticated),
    });
};

export const isGuest: Policy<any> = async (request, callback) => {
    const isAuthenticated = await authenticator.isAuthenticated(request);

    if (isAuthenticated) {
        return redirect("/");
    }

    return callback({});
};

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<IKey>(sessionStorage, {
    sessionKey: "auth",
});

authenticator.use(
    new FormStrategy(async ({ form }) => {
        return {
            access_token: "demo",
            refresh_token: "demo",
            expired_date: new Date().toISOString(),
        };
    }),
    "user-pass"
);
