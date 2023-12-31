import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "~/components/ui/button";
import type { ButtonProps } from "~/components/ui/button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
    title: "Primitive",
    component: Button,
    // tags: ["autodocs"],
    // argTypes: {
    //     backgroundColor: { control: "color" },
    // },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Variants: Story = {
    name: "Button",
    args: {
        children: "Hello world",
    },
    render: ({ children, ...args }: ButtonProps) => (
        <div className="flex min-h-screen items-center justify-center gap-3">
            <Button {...args} variant="default">
                {children}
            </Button>
            <Button {...args} variant="destructive">
                {children}
            </Button>
            <Button {...args} variant="outline">
                {children}
            </Button>
            <Button {...args} variant="secondary">
                {children}
            </Button>
            <Button {...args} variant="ghost">
                {children}
            </Button>
            <Button {...args} variant="link">
                {children}
            </Button>
        </div>
    ),
};
