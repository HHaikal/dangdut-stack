import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const root = path.resolve(__dirname, "../app");

const config: StorybookConfig = {
    webpackFinal: async (config) => {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...(config.resolve?.alias ?? {}),
                    "~": root,
                },
                extensions: [
                    ...(config.resolve?.extensions ?? []),
                    ...[".ts", ".tsx", ".js", ".jsx", ".mdx"],
                ],
            },
        };
    },
    stories: [
        "../app/**/stories/**/*.mdx",
        "../app/**/stories/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            name: "@storybook/addon-styling",
            options: {
                // postCss: {
                //     implementation: require.resolve("postcss"),
                // },
                postCss: true,
            },
        },
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
};
export default config;
