import type { IHttpApi } from "./apiResponse";
import type { Either } from "../core/either";
import { left, right } from "../core/either";

interface IGet {
    url: string;
}

interface IPost {
    url: string;
    payload: any;
}

export class GuestApi implements IHttpApi {
    async get<L, R>({ url }: IGet): Promise<Either<L, R>> {
        const response = await fetch(
            `${process.env.REACT_APP_AUTH_ENDPOINT}${url}`,
            {
                method: "GET",
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
            const data = await response.json();
            return left(data);
        }
    }

    async post<L, R>({ url, payload }: IPost): Promise<Either<L, R>> {
        const response = await fetch(
            `${process.env.REACT_APP_AUTH_ENDPOINT}${url}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
            const data = await response.json();
            return left(data);
        }
    }
}
