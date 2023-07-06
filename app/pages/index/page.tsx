import type { V2_MetaFunction } from "@remix-run/react";
import { Confetti } from "~/components/confetti";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function Index() {
    return (
        <main className="flex px-2">
            <Confetti confetti="hooray" />
        </main>
    );
}
