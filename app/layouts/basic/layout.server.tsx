import { json } from "@remix-run/node";
import { isAuthenticated } from "~/utils/auth.server";
import type { LoaderArgs } from "@remix-run/node";

export function action() {
    return {};
}

export function loader({ request }: LoaderArgs) {
    return isAuthenticated(request, ({ isAuthenticated }) => {
        return json({
            isAuthenticated: isAuthenticated,
        });
    });
}
