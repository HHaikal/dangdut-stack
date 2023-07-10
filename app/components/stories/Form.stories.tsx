import type { Meta, StoryObj } from "@storybook/react";

import { Field, TextareaField, CheckboxField } from "~/components/forms.tsx";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";

const meta: Meta = {
    title: "Form Field",
};

export default meta;

export const InputStory: StoryObj = {
    name: "Input",
    render: () => (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
            <Field
                className="w-80"
                labelProps={{
                    children: "Email",
                }}
                inputProps={{}}
            />
            <Field
                className="w-80"
                labelProps={{
                    children: "Email",
                }}
                inputProps={{
                    disabled: true,
                }}
            />
            <Field
                className="w-80"
                labelProps={{
                    children: "Email",
                }}
                inputProps={{
                    defaultValue: "test@.com",
                }}
                errors={["Not Good"]}
            />
        </div>
    ),
};

export const TextareaStory: StoryObj = {
    name: "Textarea",
    render: () => (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
            <TextareaField
                className="w-80"
                labelProps={{
                    children: "Description",
                }}
                textareaProps={{}}
            />
            <TextareaField
                className="w-80"
                labelProps={{
                    children: "Description",
                }}
                textareaProps={{
                    disabled: true,
                }}
            />
            <TextareaField
                className="w-80"
                labelProps={{
                    children: "Description",
                }}
                textareaProps={{}}
                errors={["Not Good"]}
            />
        </div>
    ),
};

export const CheckboxStory: StoryObj = {
    name: "Checkbox",
    render: () => (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
            <CheckboxField
                labelProps={{
                    children:
                        "Do you agree to our Terms of Service and Privacy Policy?",
                }}
                buttonProps={{}}
            />
            <CheckboxField
                labelProps={{
                    children:
                        "Do you agree to our Terms of Service and Privacy Policy?",
                }}
                buttonProps={{
                    disabled: true,
                }}
            />
            <CheckboxField
                labelProps={{
                    children:
                        "Do you agree to our Terms of Service and Privacy Policy?",
                }}
                buttonProps={{}}
                errors={["Not Good"]}
            />
        </div>
    ),
};

export const RadioStory: StoryObj = {
    name: "Radio",
    render: () => (
        <div className="flex min-h-screen flex-col items-center justify-center gap-5">
            <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Option One</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Option Two</Label>
                </div>
            </RadioGroup>

            <RadioGroup defaultValue="option-three" disabled={true}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-three" id="option-three" />
                    <Label htmlFor="option-three">Option One</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-four" id="option-four" />
                    <Label htmlFor="option-four">Option Two</Label>
                </div>
            </RadioGroup>

            <RadioGroup defaultValue="option-five">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="option-five"
                        id="option-five"
                        className="border-red-900"
                    />
                    <Label htmlFor="option-five" className="text-red-900">
                        Option One
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="option-six"
                        id="option-six"
                        className="border-red-900"
                    />
                    <Label htmlFor="option-six" className="text-red-900">
                        Option Two
                    </Label>
                </div>
            </RadioGroup>
        </div>
    ),
};
