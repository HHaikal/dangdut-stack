import type { LoaderArgs } from "@remix-run/node";
import { sessionShouldExist } from "~/utils/auth.server";

export function action() {
    return {};
}

export function loader({ request }: LoaderArgs) {
    return sessionShouldExist(request, async () => {
        return {};
    });
}
