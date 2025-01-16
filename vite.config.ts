import { defaultTheme } from "@sveltepress/theme-default";
import { sveltepress } from "@sveltepress/vite";
import { defineConfig } from "vite";

const config = defineConfig({
  plugins: [
    sveltepress({
      theme: defaultTheme({
        themeColor: {
          dark: "black",
          light: "white",
          gradient: {
            start: '#08ADB7',
            end: '#0F2650'
          },
          primary: "#08ADB7",
          hover: "#08ADB7"
        },
        navbar: [],
        sidebar: {
          "/docs/": [
            {
              title: "Introduction",
              to: "/docs",
            },
            {
              title: "Tutorials",
              items: [
                {
                  title: "Deploy on coolify",
                  to: "/docs/coolify/",
                },
              ],
            },
            {
              title: "Features",
              items: [
                {
                  title: "Authentication",
                  to: "/docs/authentication/",
                },
                {
                  title: "Payments",
                  to: "/docs/payment/",
                },
                {
                  title: "Database",
                  to: "/docs/database/",
                },
                {
                  title: "Email",
                  to: "/docs/email/",
                },
                {
                  title: "Analytics",
                  to: "/docs/analytics/",
                },
                {
                  title: "SEO",
                  to: "/docs/seo/",
                },
                {
                  title: "Blog",
                  to: "/docs/blog/",
                },
                {
                  title: "Internationalization",
                  to: "/docs/internationalization/",
                },
                {
                  title: "Legal pages",
                  to: "/docs/legal-pages/",
                },
              ],
            },
            {
              title: "Components",
              items: [
                {
                  title: "Features grid",
                  to: "/docs/features-grid/",
                },
                {
                  title: "Call to action",
                  to: "/docs/call-to-action/",
                },
                {
                  title: "Problem",
                  to: "/docs/problem/",
                },
                {
                  title: "Pricing",
                  to: "/docs/pricing/"
                },
                {
                  title: "Icon",
                  to: "/docs/icon/"
                }
              ]
            },
          ],
        },
        github: "https://github.com/Blackman99/sveltepress",
        logo: "/sveltepress.svg",
        preBuildIconifyIcons: {
          'vscode-icons': ['file-type-svelte', 'file-type-markdown', 'file-type-vite'],
          'logos': ['typescript-icon', 'svelte-kit'],
          'emojione': ['artist-palette'],
          'ph': ['smiley', 'layout-duotone'],
          'noto': ['package'],
          'solar': ['chat-square-code-outline', 'reorder-outline'],
          'carbon': ['tree-view-alt', 'import-export'],
          'ic': ['sharp-rocket-launch'],
          'tabler': ['icons'],
          'mdi': ['theme-light-dark'],
          'bi': ['list-nested'],
        },
      }),
      siteConfig: {
        title: "Selfkit documentation",
        description: "The official documention for the Selfkit boilerplate.",
      },
    }),
  ],
});

export default config;
