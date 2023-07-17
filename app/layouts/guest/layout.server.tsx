import type { LoaderArgs } from "@remix-run/node";
import { sessionShouldNotExist } from "~/utils/auth.server";

export function action() {
    return {};
}

export function loader({ request }: LoaderArgs) {
    return sessionShouldNotExist(request, () => {
        return {};
    });
}
