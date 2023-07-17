import type { V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
    return [
        {
            title: "Signup",
        },
        {
            name: "description",
            content: "Signup",
        },
    ];
};

export default function Signup() {
    return <main></main>;
}
