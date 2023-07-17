import type { V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "Dashboard" },
        { name: "description", content: "Dashboard" },
    ];
};

export default function Index() {
    return (
        <main className="flex px-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
            reprehenderit autem at commodi non. Mollitia, odio non tempora
            aperiam accusamus dolore! Consectetur inventore qui fugiat dolor
            accusamus similique provident perspiciatis.
        </main>
    );
}
