import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export function action({ request }: ActionArgs) {
    return authenticator.logout(request, {
        redirectTo: "/signin",
    });
}
