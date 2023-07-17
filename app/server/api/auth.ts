import { redirect } from "@remix-run/node";
import type { IHttpApi } from "./apiResponse";
import type { Either } from "../core/either";
import { left, right } from "../core/either";
import { authenticator } from "~/utils/auth.server";
import { commitSession, getSession } from "~/utils/session.server";

interface IGet {
    url: string;
    request: Request;
}

interface IPost {
    url: string;
    headers?: any;
    payload?: any;
    request: Request;
}

export class AuthApi implements IHttpApi {
    async get<L, R>({ url, request }: IGet): Promise<Either<L, R>> {
        const session = await authenticator.isAuthenticated(request);

        const response = await fetch(
            `${process.env.REACT_APP_AUTH_ENDPOINT}/${url}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
            },
        );

        if (response.ok) {
            if (
                response.headers.get("Content-Type") &&
                (response.headers.get("Content-Type") as string).includes(
                    "text/plain",
                )
            ) {
                return right({} as R);
            } else {
                const data = await response.json();
                return right(data);
            }
        } else {
            const status = response.status;

            if (status === 401) {
                const responseRefresh = await fetch(
                    `${process.env.REACT_APP_AUTH_ENDPOINT}/refresh`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            refresh_token: session!.refresh_token,
                        }),
                    },
                );

                if (responseRefresh.ok) {
                    const data = await responseRefresh.json();

                    const currentSession = await getSession(
                        request.headers.get("Cookie"),
                    );
                    currentSession.unset("auth");
                    currentSession.set("auth", data);
                    const cookie = await commitSession(currentSession);

                    throw redirect(request.url, {
                        headers: {
                            "Set-Cookie": cookie,
                        },
                    });
                } else {
                    const data = await response.json();
                    return left(data);
                }
            }

            const data = await response.json();
            return left(data);
        }
    }

    async post<L, R>({
        url,
        payload,
        request,
        headers,
    }: IPost): Promise<Either<L, R>> {
        const session = await authenticator.isAuthenticated(request);

        const response = await fetch(
            `${process.env.REACT_APP_AUTH_ENDPOINT}/${url}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                    ...headers,
                },
                body: JSON.stringify(payload),
            },
        );

        if (response.ok) {
            if (
                response.headers.get("Content-Type") &&
                (response.headers.get("Content-Type") as string).includes(
                    "text/plain",
                )
            ) {
                return right({} as R);
            } else {
                const data = await response.json();
                return right(data);
            }
        } else {
            const status = response.status;

            if (status === 401) {
                const responseRefresh = await fetch(
                    `${process.env.REACT_APP_AUTH_ENDPOINT}/refresh`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            refresh_token: session!.refresh_token,
                        }),
                    },
                );

                if (responseRefresh.ok) {
                    const data = await responseRefresh.json();

                    const currentSession = await getSession(
                        request.headers.get("Cookie"),
                    );
                    currentSession.unset("auth");
                    currentSession.set("auth", data);
                    const cookie = await commitSession(currentSession);

                    throw redirect(request.url, {
                        headers: {
                            "Set-Cookie": cookie,
                        },
                    });
                } else {
                    const data = await response.json();
                    return left(data);
                }
            }

            const data = await response.json();
            return left(data);
        }
    }

    async postFormData<L, R>({
        url,
        payload,
        request,
        headers,
    }: IPost): Promise<Either<L, R>> {
        const session = await authenticator.isAuthenticated(request);

        const response = await fetch(
            `${process.env.REACT_APP_AUTH_ENDPOINT}/${url}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
                body: payload,
            },
        );

        if (response.ok) {
            let data: any = {};
            if (
                response.headers.get("Content-Type") &&
                (response.headers.get("Content-Type") as string).includes(
                    "application/json",
                )
            ) {
                data = await response.json();
            }
            return right(data);
        } else {
            const status = response.status;

            if (status === 401) {
                const responseRefresh = await fetch(
                    `${process.env.REACT_APP_AUTH_ENDPOINT}/refresh`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            refresh_token: session!.refresh_token,
                        }),
                    },
                );

                if (responseRefresh.ok) {
                    const data = await responseRefresh.json();

                    const currentSession = await getSession(
                        request.headers.get("Cookie"),
                    );
                    currentSession.unset("auth");
                    currentSession.set("auth", data);
                    const cookie = await commitSession(currentSession);

                    throw redirect(request.url, {
                        headers: {
                            "Set-Cookie": cookie,
                        },
                    });
                } else {
                    const data = await response.json();
                    return left(data);
                }
            }

            const data = await response.json();
            return left(data);
        }
    }
}
