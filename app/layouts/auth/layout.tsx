import { Fragment } from "react";
import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
    return (
        <Fragment>
            <Outlet />
        </Fragment>
    );
}
