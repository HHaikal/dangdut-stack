import { schema } from "./page";
import { randomUUID } from "crypto";
import { parse } from "@conform-to/zod";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { commitSession, getSession } from "~/utils/session.server";

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const submission = parse(formData, { schema });

    if (!submission.value) {
        return json(
            {
                ...submission,
            },
            { status: 400 },
        );
    }

    const session = await getSession(request.headers.get("Cookie"));
    session.set("auth", {
        access_token: randomUUID(),
        refresh_token: randomUUID(),
    });

    const url = new URL(request.url);
    const returnTo = url.searchParams.get("returnTo");

    return redirect(returnTo ?? "/dashboard", {
        headers: { "Set-Cookie": await commitSession(session) },
    });
}

export function loader() {
    return {};
}
