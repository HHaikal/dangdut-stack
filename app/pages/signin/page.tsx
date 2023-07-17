import { z } from "zod";
import { Button } from "~/components/ui/button";
import { conform, useForm } from "@conform-to/react";
import { ErrorList, Field } from "~/components/forms";
import type { V2_MetaFunction } from "@remix-run/react";
import { parse } from "@conform-to/zod";
import { Form, useActionData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
    return [{ title: "Signin" }, { name: "description", content: "Signin" }];
};

export const schema = z.object({
    email: z
        .string()
        .min(1, { message: "Surel tidak boleh kosong" })
        .email({ message: "Format surel harus benar" }),
    password: z.string().min(1, { message: "kata sandi tidak boleh kosong" }),
});

export default function Signin() {
    const lastSubmission = useActionData();
    const [form, fields] = useForm({
        id: "signin-form",
        lastSubmission,
        onValidate({ formData }) {
            return parse(formData, { schema });
        },
        shouldRevalidate: "onBlur",
    });

    return (
        <main className="m-auto flex w-full flex-col px-2 lg:max-w-md">
            <Form
                method="post"
                className="flex flex-col justify-center gap-5"
                {...form.props}
            >
                <Field
                    labelProps={{
                        children: "Surel",
                    }}
                    inputProps={{
                        ...conform.input(fields.email),
                        autoFocus: true,
                    }}
                    errors={fields.email.errors}
                />

                <Field
                    labelProps={{
                        children: "kata sandi",
                    }}
                    inputProps={{
                        ...conform.input(fields.password),
                        type: "password",
                    }}
                    errors={fields.password.errors}
                />

                <ErrorList errors={[...form.errors]} id={form.errorId} />

                <Button type="submit">Masuk</Button>
            </Form>
        </main>
    );
}
