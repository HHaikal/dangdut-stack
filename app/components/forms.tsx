import { useInputEvent } from "@conform-to/react";
import React, { useId, useRef } from "react";
import { Input } from "~/components/ui/input.tsx";
import { Label } from "~/components/ui/label.tsx";
import { Checkbox, type CheckboxProps } from "~/components/ui/checkbox.tsx";
import { Textarea } from "~/components/ui/textarea.tsx";

export type ListOfErrors = Array<string | null | undefined> | null | undefined;

export function ErrorList({
    id,
    errors,
}: {
    errors?: ListOfErrors;
    id?: string;
}) {
    const errorsToRender = errors?.filter(Boolean);
    if (!errorsToRender?.length) return null;
    return (
        <ul id={id} className="flex flex-col gap-1">
            {errorsToRender.map((e) => (
                <li key={e} className="text-foreground-danger text-[10px]">
                    {e}
                </li>
            ))}
        </ul>
    );
}

export function Field({
    labelProps,
    inputProps,
    errors,
    className,
}: {
    labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    errors?: ListOfErrors;
    className?: string;
}) {
    const fallbackId = useId();
    const id = inputProps.id ?? fallbackId;
    const errorId = errors?.length ? `${id}-error` : undefined;

    return (
        <div className={className}>
            <Label
                htmlFor={id}
                {...labelProps}
                className={`${labelProps.className} 
                    ${
                        errors?.filter(Boolean).length
                            ? "text-red-900 dark:text-white"
                            : ""
                    }
                `}
            />
            <Input
                id={id}
                aria-invalid={errorId ? true : undefined}
                aria-describedby={errorId}
                {...inputProps}
                className={`${labelProps.className} 
                    ${
                        errors?.filter(Boolean).length
                            ? "border-red-900 text-red-900 dark:border-white dark:text-white"
                            : ""
                    }
                `}
            />
            <div className="pt-1 font-medium text-red-900 dark:text-white">
                {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
            </div>
        </div>
    );
}

export function TextareaField({
    labelProps,
    textareaProps,
    errors,
    className,
}: {
    labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
    textareaProps: React.InputHTMLAttributes<HTMLTextAreaElement>;
    errors?: ListOfErrors;
    className?: string;
}) {
    const fallbackId = useId();
    const id = textareaProps.id ?? textareaProps.name ?? fallbackId;
    const errorId = errors?.length ? `${id}-error` : undefined;
    return (
        <div className={className}>
            <Label
                htmlFor={id}
                {...labelProps}
                className={`${labelProps.className} 
                    ${errors?.filter(Boolean).length ? "text-red-900" : ""}
                `}
            />
            <Textarea
                id={id}
                aria-invalid={errorId ? true : undefined}
                aria-describedby={errorId}
                {...textareaProps}
                className={`${labelProps.className} 
                    ${
                        errors?.filter(Boolean).length
                            ? "border-red-900 text-red-900"
                            : ""
                    }
                `}
            />
            <div className="min-h-[32px] pb-3 pt-1 text-red-900">
                {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
            </div>
        </div>
    );
}

export function CheckboxField({
    labelProps,
    buttonProps,
    errors,
    className,
}: {
    labelProps: JSX.IntrinsicElements["label"];
    buttonProps: CheckboxProps;
    errors?: ListOfErrors;
    className?: string;
}) {
    const fallbackId = useId();
    const buttonRef = useRef<HTMLButtonElement>(null);
    // To emulate native events that Conform listen to:
    // See https://conform.guide/integrations
    const control = useInputEvent({
        // Retrieve the checkbox element by name instead as Radix does not expose the internal checkbox element
        // See https://github.com/radix-ui/primitives/discussions/874
        ref: () =>
            buttonRef.current?.form?.elements.namedItem(buttonProps.name ?? ""),
        onFocus: () => buttonRef.current?.focus(),
    });
    const id = buttonProps.id ?? buttonProps.name ?? fallbackId;
    const errorId = errors?.length ? `${id}-error` : undefined;
    return (
        <div className={className}>
            <div className="flex items-center gap-2">
                <Checkbox
                    id={id}
                    ref={buttonRef}
                    aria-invalid={errorId ? true : undefined}
                    aria-describedby={errorId}
                    {...buttonProps}
                    onCheckedChange={(state) => {
                        control.change(Boolean(state.valueOf()));
                        buttonProps.onCheckedChange?.(state);
                    }}
                    onFocus={(event) => {
                        control.focus();
                        buttonProps.onFocus?.(event);
                    }}
                    onBlur={(event) => {
                        control.blur();
                        buttonProps.onBlur?.(event);
                    }}
                    type="button"
                    className={`${labelProps.className} ${
                        errors?.filter(Boolean).length ? "border-red-900" : ""
                    }
                `}
                />
                <label
                    htmlFor={id}
                    {...labelProps}
                    className={`text-body-xs self-center text-muted-foreground ${
                        labelProps.className
                    } 
                    ${errors?.filter(Boolean).length ? "text-red-900" : ""}
                `}
                />
            </div>
            <div className="pb-3 pt-1 text-red-900">
                {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
            </div>
        </div>
    );
}
